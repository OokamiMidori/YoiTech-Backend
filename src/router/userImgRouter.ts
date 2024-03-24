import express from "express"
import { UserImgController } from "../controller/userImgController"
import { UserImgBusiness } from "../business/UserImgBusiness"
import { UserImgDatabase } from "../dataBase/UserImgDatabase"
import { TokenManager } from "../services/TokenManager"

export const UserImgRouter = express.Router()

const userImgController = new UserImgController(
    new UserImgBusiness(
        new UserImgDatabase(),
        new TokenManager()
    )
)

UserImgRouter.post("/", userImgController.create)
UserImgRouter.get("/:id", userImgController.get)
UserImgRouter.delete("/:id", userImgController.delete)
UserImgRouter.put("/:id", userImgController.update)