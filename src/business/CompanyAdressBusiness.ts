import { string } from "zod";
import { CompanyAdressDatabase } from "../dataBase/CompanyAdressDatabase";
import { createCompanyAdressInputDTO, deleteCompanyAdressInputDTO, getCompanyAdressInputDTO, getCompanyAdressOutputDTO, updateCompanyAdressInputDTO } from "../dtos/companyAdressDTO";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES } from "../services/TokenManager";
import { BadRequestError } from "../errors/BadRequestError";
import { CompanyAdress } from "../models/companyAdress";

export class CompanyAdressBusiness {
    constructor(
        private companyAdressDatabase: CompanyAdressDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator
    ) { }

    public createCompanyAdress = async (input: createCompanyAdressInputDTO): Promise<void> => {
        const { token, companyId, cep, city, neighborhood, apartment } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof companyId !== "string") {
            throw new BadRequestError("'companyId' deve ser string")
        }

        if (typeof cep !== "string") {
            throw new BadRequestError("'cep' deve ser string")
        }

        if (typeof city !== "string") {
            throw new BadRequestError("'city' deve ser string")
        }

        if (typeof neighborhood !== "string") {
            throw new BadRequestError("'neighborhood' deve ser string")
        }

        if (typeof apartment !== "string") {
            throw new BadRequestError("'apartment' deve ser string")
        }

        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()

        const companyAdress = new CompanyAdress(
            id,
            companyId,
            cep,
            city,
            neighborhood,
            apartment,
            createdAt
        )

        const companyAdressDB = companyAdress.toDBModel()

        await this.companyAdressDatabase.insert(companyAdressDB)
    }

    public deleteCompanyAdress = async (input: deleteCompanyAdressInputDTO): Promise<void> => {
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

        const companyAdressDB = await this.companyAdressDatabase.getById(idToDelete)

        if (!companyAdressDB) {
            throw new BadRequestError("'idToDelete' inválido")
        }

        if (payload.role !== USER_ROLES.ADMIN && payload.id !== companyAdressDB.id) {
            throw new BadRequestError("'idToDelete' inválido")
        }

        await this.companyAdressDatabase.delete(idToDelete)
    }
    public updateUserAdress = async (input: updateCompanyAdressInputDTO): Promise<void> => {
        const {token, idToUpdate, cep, city, neighborhood, apartment, companyId} = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof companyId !== "string") {
            throw new BadRequestError("'companyId' deve ser string")
        }

        if (typeof cep !== "string") {
            throw new BadRequestError("'cep' deve ser string")
        }

        if (typeof city !== "string") {
            throw new BadRequestError("'city' deve ser string")
        }

        if (typeof neighborhood !== "string") {
            throw new BadRequestError("'neighborhood' deve ser string")
        }

        if (typeof apartment !== "string") {
            throw new BadRequestError("'apartment' deve ser string")
        }

        if(typeof idToUpdate !=="string"){
            throw new BadRequestError("'idToDelete' deve ser string")
        }

        if(payload.role!==USER_ROLES.ADMIN && payload.id !== companyId){
            throw new BadRequestError("Só quem criou pode modificar")
        }

        const companyAdressExist = await this.companyAdressDatabase.getById(idToUpdate)

        if(!companyAdressExist){
            throw new BadRequestError("'idToUpdate' inválido")
        }

        const createdAt = new Date().toISOString()

        const companyAdress = new CompanyAdress(
            idToUpdate,
            companyId,
            cep,
            city,
            neighborhood,
            apartment,
            createdAt
        )

        const companyAdressDB = companyAdress.toDBModel()
        await this.companyAdressDatabase.update(idToUpdate,companyAdressDB)

    }

    public getCompanyAdress = async (input:getCompanyAdressInputDTO):Promise <getCompanyAdressOutputDTO>=>{
        const {token, companyId} = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof companyId !== "string") {
            throw new BadRequestError("'companyId' deve ser string")
        }

        const companyAdressDB = await this.companyAdressDatabase.getByCompanyId(companyId)

        if(!companyAdressDB){
            throw new BadRequestError("company não possui endereço cadastrado")
        }

        const companyAdress = new CompanyAdress(
            companyAdressDB.id,
            companyAdressDB.company_id,
            companyAdressDB.cep,
            companyAdressDB.city,
            companyAdressDB.neighborhood,
            companyAdressDB.apartment,
            companyAdressDB.created_at
        ) 

        const companyAdressModel = companyAdress.toBusinessModel()

        return companyAdressModel

    }
}

