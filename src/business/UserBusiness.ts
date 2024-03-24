import { EMAIL_STATUS, STATUS_USER_COMPANY, TokenPayload, USER_ROLES, UserDB } from "../Types";
import { UserDatabase } from "../dataBase/UserDatabase";
import { ActivationEmailInputDTO, LoginInputDTO, LoginOutputDTO, SignupInputDTO, SignupOutputDTO, getUserInputDTO, getUserOutputDTO } from "../dtos/userDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { name, email, password, phoneNumber, birthDate, gender, maritalStatus, nationality } = input
        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")

        }
        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }

        if (typeof phoneNumber !== "string") {
            throw new BadRequestError("'phoneNumber' deve ser string")
        }

        if (typeof birthDate !== "string") {
            throw new BadRequestError("'birthDate' deve ser string")
        }

        if (typeof gender !== "string") {
            throw new BadRequestError("'gender' deve ser string")
        }

        if (typeof maritalStatus !== "string") {
            throw new BadRequestError("'maritalStatus' deve ser string")
        }

        if (typeof nationality !== "string") {
            throw new BadRequestError("'nationality' deve ser string")
        }
        
        // console.log("Até aqui foi")

        const id = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)
        const role = USER_ROLES.NORMAL
        const emailStatus = EMAIL_STATUS.INATIVO
        const status = STATUS_USER_COMPANY.ATIVO
        const createdAt = new Date().toISOString()

        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
            role,
            phoneNumber,
            birthDate,
            gender,
            nationality,
            maritalStatus,
            status,
            emailStatus,
            createdAt
        )

        const userDB = newUser.toDBModel()

        await this.userDatabase.insert(userDB)

        const payload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: SignupOutputDTO = {
           token
        }

        return output
    }

    public Login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password } = input

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }

        const userDB: UserDB | undefined = await this.userDatabase.findByEmail(email)

        if (!userDB) {
            throw new NotFoundError("'email' e/ou 'senha' inválido(s)")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.phone_number,
            userDB.birth_date,
            userDB.gender,
            userDB.nationality,
            userDB.marital_status,
            userDB.status,
            userDB.email_status,
            userDB.created_at
        )

        const hashedPassword = user.getPassword()

        const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)

        if (!isPasswordCorrect) {
            throw new BadRequestError("'email' e/ou 'senha' inválido(s)")
        }

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: LoginOutputDTO = {
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

        const user = await this.userDatabase.findByEmail(email)

        if (!user) {
            throw new BadRequestError("'email' não encontrado")
        }

        const userId = payload.id
        const emailStatus = confirmation ? 1 : 0
        const role = EMAIL_STATUS.ATIVO

        const UserConfirmed = new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.phone_number,
            user.birth_date,
            user.gender,
            user.nationality,
            user.marital_status,
            user.status,
            role,
            user.created_at
        )


        const updatedUserDB = UserConfirmed.toDBModel()


        await this.userDatabase.updateUser(user.id, updatedUserDB)

    }
    public signupAdmin = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { name, email, password, phoneNumber, birthDate, gender, maritalStatus, nationality } = input
        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")

        }
        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }

        if (typeof phoneNumber !== "string") {
            throw new BadRequestError("'phoneNumber' deve ser string")
        }

        if (typeof birthDate !== "string") {
            throw new BadRequestError("'birthDate' deve ser string")
        }

        if (typeof gender !== "string") {
            throw new BadRequestError("'gender' deve ser string")
        }

        if (typeof maritalStatus !== "string") {
            throw new BadRequestError("'maritalStatus' deve ser string")
        }

        if (typeof nationality !== "string") {
            throw new BadRequestError("'nationality' deve ser string")
        }


        const id = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)
        const role = USER_ROLES.ADMIN
        const emailStatus = EMAIL_STATUS.INATIVO
        const status = STATUS_USER_COMPANY.ATIVO
        const createdAt = new Date().toISOString()

        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
            role,
            phoneNumber,
            birthDate,
            gender,
            nationality,
            maritalStatus,
            status,
            emailStatus,
            createdAt
        )

        const userDB = newUser.toDBModel()

        await this.userDatabase.insert(userDB)

        const payload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: SignupOutputDTO = {
            token
        }

        return output
    }

    public getUser = async(input:getUserInputDTO):Promise<getUserOutputDTO>=>{
        const {token, idToGet} = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if(typeof idToGet !== "string"){
            throw new BadRequestError("'idToGet' deve ser string")
        }

        const userDB = await this.userDatabase.findById(idToGet)

        if(!userDB){
            throw new BadRequestError("idToGet inválido")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.phone_number,
            userDB.birth_date,
            userDB.gender,
            userDB.nationality,
            userDB.marital_status,
            userDB.status,
            userDB.email_status,
            userDB.created_at
        )

        const userBusiness = user.toBusinessModel()

        return userBusiness
    }

}

