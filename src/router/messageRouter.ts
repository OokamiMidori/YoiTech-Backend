import express from "express"
import { MessageController } from "../controller/messageController"
import { MessageBusiness } from "../business/MessageBusiness"
import { MessageDatabase } from "../dataBase/MessageDatabase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"
import { HashManager } from "../services/HashManager"
import { UserDatabase } from "../dataBase/UserDatabase"
import { CompanyDatabase } from "../dataBase/CompanyDatabase"

export const MessageRouter = express.Router()

const messageController = new MessageController(
    new MessageBusiness(
        new MessageDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new HashManager(),
        new UserDatabase(),
        new CompanyDatabase()
    )
)

MessageRouter.post("/", messageController.createMessage)
MessageRouter.get("/user/:id", messageController.getMessageByUserId)
MessageRouter.get("/company/:id", messageController.getMessageByCompanyId)
MessageRouter.get("/creator/:id", messageController.getMessageByCreatorId)
MessageRouter.delete("/:id", messageController.delete)