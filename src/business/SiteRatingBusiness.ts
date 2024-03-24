import { SiteRatingDatabase } from "../dataBase/SiteRatingDatabase";
import { createSiteRatingInputDTO, deleteSiteRatingInputDTO, getSiteRatingInputDTO, getSiteRatingOutputDTO } from "../dtos/siteRatingDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES } from "../services/TokenManager";
import { CompanyDatabase } from "../dataBase/CompanyDatabase";
import { SiteRating } from "../models/siteRating";
import { SiteRatingDB } from "../Types";

export class SiteRatingBusiness {
    constructor(
        private siteRatingDatabase: SiteRatingDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private companyDatabase:CompanyDatabase
    ){}

    public createSiteRating = async (input:createSiteRatingInputDTO):Promise<void>=>{

        const {token, companyId, rating, message} =  input


        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if(typeof companyId !=="string"){
            throw new BadRequestError("'companyId' deve ser string")
        }

        if(typeof rating !== "number"){
            throw new BadRequestError("'rating' deve ser number")
        }

        if(typeof message !== "string"){
            throw new BadRequestError("'message' deve ser string")
        }

        const company = await this.companyDatabase.getById(companyId)

        if(!company){
            throw new BadRequestError("'companyId' inválido")
        }

        const createdAt = new Date().toISOString()

        const id = this.idGenerator.generate()

        const siteRating = new SiteRating(
            id,
            companyId,
            rating,
            message,
            createdAt
        )

        const siteRatingDB = siteRating.toDBModel()

        await this.siteRatingDatabase.insert(siteRatingDB)
    }

    public deleteSiteRating = async (input:deleteSiteRatingInputDTO):Promise<void>=>{
        const{token, idToDelete} = input
        

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if(typeof idToDelete !== "string"){
            throw new BadRequestError("'idToDelete' deve ser string")
        }

        const siteRatingDB = await this.siteRatingDatabase.getById(idToDelete)

        if(!siteRatingDB){
            throw new BadRequestError("'idToDelete' inválido")
        }

        if(payload.role !== USER_ROLES.ADMIN && payload.id !== siteRatingDB.company_id){
            throw new BadRequestError("Somente quem criou pode deletar")
        }

        await this.siteRatingDatabase.delete(idToDelete)
    }

    public getSiteRating = async (input:getSiteRatingInputDTO):Promise<getSiteRatingOutputDTO>=>{
        const {token} = input

        
        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const siteRatingsDB:SiteRatingDB[]= await this.siteRatingDatabase.getAllRating()

        const siteRatings = siteRatingsDB.map((siteRatingDB)=>{
            const siteRating = new SiteRating(
                siteRatingDB.id,
                siteRatingDB.company_id,
                siteRatingDB.rating,
                siteRatingDB.message,
                siteRatingDB.created_at
            )

            return siteRating.toBusinessModel()
        })

        return siteRatings
    }
}