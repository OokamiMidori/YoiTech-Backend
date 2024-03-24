import { UserImgDatabase } from "../dataBase/UserImgDatabase";
import { deleteUserImgInputDTO, getUserImgInputDTO, getUserImgOutputDTO, insertUserImgInputDTO, updateUserImgInputDTO } from "../dtos/userImgDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { UserImg } from "../models/userImg";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES } from "../services/TokenManager";

export class UserImgBusiness {
    constructor(
        private userImgDatabase: UserImgDatabase,
        private tokenManager: TokenManager
    ) { }

    public createUserImg = async (input: insertUserImgInputDTO): Promise<void> => {
        const { token, img } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof img !== "string") {
            throw new BadRequestError("'img' deve ser string")
        }

        const userId = payload.id
        const userImgExist = await this.userImgDatabase.findById(userId)

        if (userImgExist) {
            throw new BadRequestError("Usuário possui imagem cadastrada")
        }

        const createdAt = new Date().toISOString()

        const userImg = new UserImg(
            userId,
            img,
            createdAt
        )

        const userImgDB = userImg.toDBModel()

        await this.userImgDatabase.insert(userImgDB)
    }

    public getUserImg = async (input: getUserImgInputDTO): Promise<getUserImgOutputDTO> => {
        const { token, userId } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof userId !== "string") {
            throw new BadRequestError("'userId' deve ser string")
        }

        const userImgDB = await this.userImgDatabase.findById(userId)

        if (!userImgDB) {
            throw new BadRequestError("Imagem não existente")
        }

        const userImg = new UserImg(
            userImgDB.user_id,
            userImgDB.img,
            userImgDB.created_at
        )

        const userImgBusiness = userImg.toBusinessModel()

        return userImgBusiness
    }

    public deleteUserImg = async (input: deleteUserImgInputDTO): Promise<void> => {
        const { token, idToDelete } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const userImgDB = await this.userImgDatabase.findById(idToDelete)

        if (!userImgDB) {
            throw new BadRequestError("Imagem não existente")
        }

        if (payload.role !== USER_ROLES.ADMIN && payload.id !== idToDelete) {
            throw new BadRequestError("Somente o usuário que criou pode deletar")
        }

        await this.userImgDatabase.delete(idToDelete)

    }

    public updateUserImg = async (input: updateUserImgInputDTO): Promise<void> => {
        const { token, idToUpdate, img } = input


        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const userImgDB = await this.userImgDatabase.findById(idToUpdate)

        if (!userImgDB) {
            throw new BadRequestError("Imagem não existente")
        }

        if (typeof img !== "string") {
            throw new BadRequestError("'img' deve ser string")
        }

        const userImg = new UserImg(
            userImgDB.user_id,
            img,
            userImgDB.created_at
        )

        const userImgToDB = userImg.toDBModel()

        await this.userImgDatabase.update(idToUpdate, userImgToDB)
    }
}