import { USER_ROLES } from "../Types";
import { CompanyLogoDatabase } from "../dataBase/CompanyLogoDatabase";
import { deleteCompanyLogoInputDTO, getCompanyLogoInputDTO, getCompanyLogoOutputDTO, insertCompanyLogoInputDTO, updateCompanyLogoInputDTO } from "../dtos/companyLogoDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { CompanyLogo } from "../models/companyLogo";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class CompanyLogoBusiness {
    constructor(
        private companyLogoDatabase: CompanyLogoDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator
    ) { }

    public insertCompanyLogo = async (input: insertCompanyLogoInputDTO): Promise<void> => {
        const { token, logo } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }


        const companyLogoDBExist = await this.companyLogoDatabase.getById(payload.id)

        if (companyLogoDBExist) {
            throw new BadRequestError("Company já possui logo cadastrada")
        }

        if (typeof logo !== "string") {
            throw new BadRequestError("'logo' deve ser string")
        }

        const id = this.idGenerator.generate()

        const createdAt = new Date().toISOString()
        const companyId = payload.id

        const companyLogo = new CompanyLogo(
            id,
            companyId,
            logo,
            createdAt
        )

        const companyLogoDB = companyLogo.toDBModel()

        await this.companyLogoDatabase.insert(companyLogoDB)

    }

    public getCompanyLogo = async (input: getCompanyLogoInputDTO): Promise<getCompanyLogoOutputDTO> => {
        const { token, companyId } = input


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

        const companyLogoExiste = await this.companyLogoDatabase.getById(companyId)

        if (!companyLogoExiste) {
            throw new BadRequestError("'companyId' inválido")
        }

        const companyLogo = new CompanyLogo(
            companyLogoExiste.id,
            companyLogoExiste.company_id,
            companyLogoExiste.logo_img,
            companyLogoExiste.created_at
        )

        const companyLogoBusiness = companyLogo.toBusinessModel()

        return companyLogoBusiness
    }

    public deleteCompanyLogo = async (input: deleteCompanyLogoInputDTO): Promise<void> => {
        const { idToDelete, token } = input


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

        const companyLogoExist = await this.companyLogoDatabase.getById(idToDelete)

        if (!companyLogoExist) {
            throw new BadRequestError("'idToDelete' inválido")
        }

        if (payload.role !== USER_ROLES.ADMIN && payload.id !== companyLogoExist.company_id) {
            throw new BadRequestError("Somente o criador pode deletar")
        }

        await this.companyLogoDatabase.delete(idToDelete)
    }

    public updateCompanyLogo = async (input: updateCompanyLogoInputDTO): Promise<void> => {
        const { token, idToUpdate, logo } = input


        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof idToUpdate !== "string") {
            throw new BadRequestError("'idToUpdate' deve ser string")
        }

        if (typeof logo !== "string") {
            throw new BadRequestError("'logo' deve ser string")
        }

        const companyLogoExist = await this.companyLogoDatabase.getById(idToUpdate)

        if (!companyLogoExist) {
            throw new BadRequestError("'idToUpdate' inválido")
        }

        const companyLogo = new CompanyLogo(
            companyLogoExist.id,
            companyLogoExist.company_id,
            logo,
            companyLogoExist.created_at
        )

        const companyLogoDB = companyLogo.toDBModel()

        await this.companyLogoDatabase.update(idToUpdate, companyLogoDB)
    }
}