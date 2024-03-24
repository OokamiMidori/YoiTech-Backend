import { CompanyDB, EMAIL_STATUS, STATUS_USER_COMPANY, TokenPayload, USER_ROLES } from "../Types";
import { CompanyDatabase } from "../dataBase/CompanyDatabase";
import { ActivationEmailInputDTO, getCompanyInputDTO, getCompanyOutputDTO, loginCompanyInputDTO, loginCompanyOutputDTO, signupCompanyInputDTO, signupCompanyOutputDTO } from "../dtos/companyDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { Company } from "../models/company";
import { SignupOutputDTO } from "../dtos/userDTO";

export class CompanyBusiness {
    constructor(
        private companyDatabase: CompanyDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ) { }

    public signup = async (input: signupCompanyInputDTO): Promise<signupCompanyOutputDTO> => {
        const { responsableCompanyName, email, password, phoneNumber, cellPhoneNumber } = input

        if (typeof responsableCompanyName !== "string") {
            throw new BadRequestError("'responsableName' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'passowrd' deve ser string")
        }

        if (typeof phoneNumber !== "string") {
            throw new BadRequestError("'phoneNumber' deve ser string")
        }

        if (cellPhoneNumber !== "string") {
            throw new BadRequestError("'cellPhoneNumber' deve ser string")
        }

        const hashedPassword = await this.hashManager.hash(password)
        const id = this.idGenerator.generate()
        const role = USER_ROLES.NORMAL
        const emailStatus = EMAIL_STATUS.INATIVO
        const status = STATUS_USER_COMPANY.ATIVO
        const createdAt = new Date().toISOString()

        const newCompany = new Company(
            id,
            responsableCompanyName,
            email,
            hashedPassword,
            phoneNumber,
            cellPhoneNumber,
            role,
            status,
            emailStatus,
            createdAt
        )

        const companyDB = newCompany.toDBModel()

        await this.companyDatabase.insert(companyDB)

        const payload: TokenPayload = {
            id: newCompany.getId(),
            name: newCompany.getResponsableCompanyName(),
            role: newCompany.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: SignupOutputDTO = {
            token
        }

        return output
    }

    public login = async (input: loginCompanyInputDTO): Promise<loginCompanyOutputDTO> => {
        const { email, password } = input

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }

        const companyDB: CompanyDB | undefined = await this.companyDatabase.findByEmail(email)

        if (!companyDB) {
            throw new BadRequestError("'email' e/ou 'senha' incorretos")
        }

        const company = new Company(
            companyDB.id,
            companyDB.responsible_company_name,
            companyDB.email,
            companyDB.password,
            companyDB.phone_number,
            companyDB.cell_phone_number,
            companyDB.role,
            companyDB.status,
            companyDB.email_status,
            companyDB.created_at
        )

        const hashedPassword = company.getPassword()

        const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)

        if (!isPasswordCorrect) {
            throw new BadRequestError("'email' e/ou 'senha' inválido(s)")
        }

        const payload: TokenPayload = {
            id: company.getId(),
            name: company.getResponsableCompanyName(),
            role: company.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: loginCompanyOutputDTO = {
            token
        }

        return output
    }

    public emailActivation = async (input: ActivationEmailInputDTO): Promise<void> => {
        const { email, confirmation, token } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (email !== "string") {
            throw new BadRequestError("'email' deve ser uma string")
        }

        if (confirmation !== "boolean") {
            throw new BadRequestError("'confirmation' deve ser boolean")
        }

        const company = await this.companyDatabase.findByEmail(email)

        if (!company) {
            throw new BadRequestError("'email' não encontrado")
        }

        const companyId = payload.id
        const emailStatus = confirmation ? 1 : 0
        const companyStatus = EMAIL_STATUS.ATIVO

        const CompanyConfirmed = new Company(
            company.id,
            company.responsible_company_name,
            company.email,
            company.password,
            company.role,
            company.phone_number,
            company.role,
            company.status,
            companyStatus,
            company.created_at
        )


        const updatedCompanyDB = CompanyConfirmed.toDBModel()


        await this.companyDatabase.update(companyId,updatedCompanyDB)

    }

    public getCompany = async (input:getCompanyInputDTO):Promise <getCompanyOutputDTO>=>{
        const {token} = input

        
        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const idToGet = payload.id

        const companyDB = await this.companyDatabase.getById(idToGet)

        if(!companyDB){
            throw new BadRequestError("Company não existe")
        }
        const company = new Company(
            companyDB.id,
            companyDB.responsible_company_name,
            companyDB.email,
            companyDB.password,
            companyDB.phone_number,
            companyDB.cell_phone_number,
            companyDB.role,
            companyDB.status,
            companyDB.email_status,
            companyDB.created_at
        )

        const companyBusiness = company.toBusinessModel()

        return companyBusiness
    }
}