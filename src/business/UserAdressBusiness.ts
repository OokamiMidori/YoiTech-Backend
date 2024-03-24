
import { UserAdressDatabase } from "../dataBase/UserAdressDatabase";
import { deletUserAdressInputDTO, editUserAdressInputDTO, getUserAdressInputDTO, getUserAdressOutputDTO, userAdressInputDTO } from "../dtos/userAdressDTO";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES } from "../services/TokenManager";
import { BadRequestError } from "../errors/BadRequestError";
import { UserAdressDB } from "../Types";
import { UserAdress } from "../models/userAdress";


export class UserAdressBusiness {
    constructor(
        private userAdressDatabase: UserAdressDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ) { }

    public createUserAdress = async (input: userAdressInputDTO): Promise<void> => {
        const { token, userId, cep, stateProvince, city, neighborhood, apartment } = input


        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (cep !== "string") {
            throw new BadRequestError("'cep' deve ser string")
        }

        if (stateProvince !== "string") {
            throw new BadRequestError("'stateProvince' deve ser string")
        }

        if (city !== "string") {
            throw new BadRequestError("'city' deve ser string")
        }

        if (neighborhood !== "string") {
            throw new BadRequestError("'neighborhood' deve ser string")
        }

        if (apartment !== "string") {
            throw new BadRequestError("'apartment' deve ser string")
        }

        if (userId !== "string") {
            throw new BadRequestError("'userId' deve ser string")
        }

        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()

        const userAdressDB: UserAdressDB | undefined = await this.userAdressDatabase.getByUserId(userId)

        if (userAdressDB) {
            throw new BadRequestError("Endereço já cadastrado")
        }

        const newUserAdress = new UserAdress(
            userId,
            id,
            cep,
            stateProvince,
            city,
            neighborhood,
            apartment,
            createdAt
        )

        const UserAdressDB = newUserAdress.toDBModel()

        await this.userAdressDatabase.insert(UserAdressDB)
    }

    public getUserAdress = async (input: getUserAdressInputDTO): Promise<getUserAdressOutputDTO> => {
        const { token } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const userId = payload.id

        const userAdressDB: UserAdressDB =
            await this.userAdressDatabase.getByUserId(userId)

        const userAdressBusiness = new UserAdress(
            userAdressDB.user_id,
            userAdressDB.id,
            userAdressDB.cep,
            userAdressDB.state_province,
            userAdressDB.city,
            userAdressDB.neighborhood,
            userAdressDB.apartment,
            userAdressDB.created_at
        )

        const result = userAdressBusiness.toBusinessModel()

        return result
    }

    public deleteUserAdress = async (input: deletUserAdressInputDTO): Promise<void> => {
        const { token, idToDelet } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof idToDelet !== "string") {
            throw new BadRequestError("'idToDelet' deve ser string")
        }

        const userAdressDB = await this.userAdressDatabase.getById(idToDelet)

        if (!userAdressDB) {
            throw new BadRequestError("'idToDelet' inválido")
        }

        if (payload.role !== USER_ROLES.ADMIN && payload.id !== userAdressDB.user_id) {
            throw new BadRequestError("Só quem criou pode deletar")
        }

        await this.userAdressDatabase.delete(idToDelet)
    }

    public updateUserAdress = async (input: editUserAdressInputDTO): Promise<void> => {
        const { token, cep, stateProvince, city, neighborhood, apartment, idToEdit } = input
        
        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if(typeof idToEdit !== "string"){
            throw new BadRequestError("'idToEdit' deve ser string")
        }

        if (cep !== "string") {
            throw new BadRequestError("'cep' deve ser string")
        }

        if (stateProvince !== "string") {
            throw new BadRequestError("'stateProvince' deve ser string")
        }

        if (city !== "string") {
            throw new BadRequestError("'city' deve ser string")
        }

        if (neighborhood !== "string") {
            throw new BadRequestError("'neighborhood' deve ser string")
        }

        if (apartment !== "string") {
            throw new BadRequestError("'apartment' deve ser string")
        }
        
        const userDBExist = await this.userAdressDatabase.getById(idToEdit)
       
        if(!userDBExist){
            throw new BadRequestError("idToEdit inválido")
        }

        const createdAt = new Date().toISOString()

        const userAdress = new UserAdress(
            userDBExist.user_id,
            userDBExist.id,
            cep,
            stateProvince,
            city,
            neighborhood,
            apartment,
            createdAt
        )

        const userAdressDB = userAdress.toDBModel()

        await this.userAdressDatabase.update(idToEdit, userAdressDB)
    }
}