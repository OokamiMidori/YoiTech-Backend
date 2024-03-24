import { RatingCompanyDB } from "../Types";
import { JobApplicationDatabase } from "../dataBase/JobApplicationDatabase";
import { RatingCompanyDatabase } from "../dataBase/RatingCompanyDatabase";
import { createCompanyRatingInputDTO, deleteCompanyRatingInputDTO, getRatingByCompanyIdInputDTO, getRatingByCompanyIdOutputDTO } from "../dtos/ratingCompanyDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { RatingCompany } from "../models/ratingCompany";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES } from "../services/TokenManager";

export class RatingCompanyBusiness {
    constructor(
        private ratingCompanyDatabase: RatingCompanyDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private jobApplicationDatabase: JobApplicationDatabase
    ) { }


    public createCompanyRating = async (input: createCompanyRatingInputDTO): Promise<void> => {
        const { token, applicationId, rating, message } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof applicationId !== "string") {
            throw new BadRequestError("'applicationId' deve ser string")
        }

        if (typeof rating !== "number") {
            throw new BadRequestError("'rating' deve ser number")
        }

        if (typeof message !== "string") {
            throw new BadRequestError("'message' deve ser string")
        }

        const id = this.idGenerator.generate()

        const applicationDB = await this.jobApplicationDatabase.getById(applicationId)

        if (!applicationDB) {
            throw new BadRequestError("'applicationId' inválido")
        }

        const createdAt = new Date().toISOString()

        const ratingCompany = new RatingCompany(
            id,
            applicationId,
            rating,
            message,
            createdAt
        )

        const ratingCompanyDB = ratingCompany.toDBModel()

        await this.ratingCompanyDatabase.insert(ratingCompanyDB)
    }

    public deleteRating = async (input: deleteCompanyRatingInputDTO): Promise<void> => {
        const { token, idToDelete } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof idToDelete !== "string") {
            throw new BadRequestError("'idToDelete' deve ser string")
        }

        const ratingCompanyDB = await this.ratingCompanyDatabase.getById(idToDelete)

        if (!ratingCompanyDB) {
            throw new BadRequestError("'idToDelete' inválido")
        }

        const application = await this.jobApplicationDatabase.getById(ratingCompanyDB.application_id)


        if (payload.role !== USER_ROLES.ADMIN && payload.id !== application.user_id) {
            throw new BadRequestError("Sómente o criador pode deletar")
        }

        await this.ratingCompanyDatabase.delete(idToDelete)

    }

    public getRatingCompanyByCompanyId = async (input: getRatingByCompanyIdInputDTO): Promise<getRatingByCompanyIdOutputDTO> => {
        const { token } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const ratingCompanysDB: RatingCompanyDB[] = await this.ratingCompanyDatabase.getAllRating()

        const ratingCompanys = ratingCompanysDB.map((ratingCompanyDB) => {
            const ratingCompany = new RatingCompany(
                ratingCompanyDB.id,
                ratingCompanyDB.application_id,
                ratingCompanyDB.rating,
                ratingCompanyDB.message,
                ratingCompanyDB.created_at
            )
            return ratingCompany.toBusinessModel()
        })

        return ratingCompanys


    }
}