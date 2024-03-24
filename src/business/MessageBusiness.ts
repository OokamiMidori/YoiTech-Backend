import { MessageDB } from "../Types";
import { CompanyDatabase } from "../dataBase/CompanyDatabase";
import { MessageDatabase } from "../dataBase/MessageDatabase";
import { UserDatabase } from "../dataBase/UserDatabase";
import { deleteMessageInputDTO, getAllMessagesByCompanyIdInputDTO, getAllMessagesByCompanyIdOutputDTO, getAllMessagesByCreatorIdInputDTO, getAllMessagesByCreatorIdOutputDTO, getAllMessagesByUserIdInputDTO, getAllMessagesByUserIdOutputDTO, insertMessageInputDTO } from "../dtos/messageDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { Message } from "../models/Message";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES } from "../services/TokenManager";

export class MessageBusiness {
    constructor(
        private messageDatabase: MessageDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private userDatabase: UserDatabase,
        private companyDatabase: CompanyDatabase
    ) { }

    public createMessage = async (input: insertMessageInputDTO): Promise<void> => {
        const { token, companyId, userId, content } = input

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

        if (typeof userId !== "string") {
            throw new BadRequestError("'userId' deve ser string")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("'content' deve ser string")
        }

        const user = await this.userDatabase.findById(userId)

        if (!user) {
            throw new BadRequestError("'userId' inválido")
        }

        const company = await this.companyDatabase.getById(companyId)

        if (!company) {
            throw new BadRequestError("'companyId' inválido")
        }

        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()

        const message = new Message(
            id,
            payload.id,
            companyId,
            userId,
            content,
            createdAt
        )

        const messageDB = message.toDBModel()

        await this.messageDatabase.insert(messageDB)
    }

    public getMessagesByCreatorId = async (input: getAllMessagesByCreatorIdInputDTO): Promise<getAllMessagesByCreatorIdOutputDTO> => {

        const { token } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const idToFind = payload.id

        const messagesDB: MessageDB[] = await this.messageDatabase.getAllMessageByCreatorId(idToFind)

        const messages = messagesDB.map((messageDB) => {
            const message = new Message(
                messageDB.id,
                messageDB.creator_id,
                messageDB.company_id,
                messageDB.user_id,
                messageDB.content,
                messageDB.created_at
            )

            return message.toBusinessModel()
        })

        return messages
    }

    public getMessagesByCompanyId = async (input: getAllMessagesByCompanyIdInputDTO): Promise<getAllMessagesByCompanyIdOutputDTO> => {

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

        const company = await this.companyDatabase.getById(companyId)

        if (!company) {
            throw new BadRequestError("'companyId' inválido")
        }

        const messagesDB: MessageDB[] = await this.messageDatabase.getAllMessageByCompanyId(companyId)

        const messages = messagesDB.map((messageDB) => {
            const message = new Message(
                messageDB.id,
                messageDB.creator_id,
                messageDB.company_id,
                messageDB.user_id,
                messageDB.content,
                messageDB.created_at
            )

            return message.toBusinessModel()
        })

        return messages

    }
    public getMessagesByUserID = async (input: getAllMessagesByUserIdInputDTO): Promise<getAllMessagesByUserIdOutputDTO> => {


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

        const user = await this.userDatabase.findById(userId)

        if (!user)
            throw new BadRequestError("'userId' inválido")


        const messagesDB: MessageDB[] = await this.messageDatabase.getAllMessageByUserId(userId)

        const messages = messagesDB.map((messageDB) => {
            const message = new Message(
                messageDB.id,
                messageDB.creator_id,
                messageDB.company_id,
                messageDB.user_id,
                messageDB.content,
                messageDB.created_at
            )

            return message.toBusinessModel()
        })

        return messages
    }

    public deleteMessage = async (input:deleteMessageInputDTO):Promise<void>=>{
        const {token, idToDelete} = input

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

        const messageDB = await this.messageDatabase.getById(idToDelete)

        if(!messageDB){
            throw new BadRequestError("'idToDelete' inválido")
        }

        if(payload.role !== USER_ROLES.ADMIN && messageDB.creator_id !== payload.id){
            throw new BadRequestError(" somente o criador pode deletar o item")
        }

        await this.messageDatabase.delete(idToDelete)

    }

    
}