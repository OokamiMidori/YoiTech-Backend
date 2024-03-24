import express from "express"
import { UserDetailController } from "../controller/userDetailController"
import { UserDetailBusiness } from "../business/UserDetailBusiness"
import { UserDatabase } from "../dataBase/UserDatabase"
import { UserDetailDatabase } from "../dataBase/UserDetailDatabase"
import { TokenManager } from "../services/TokenManager"


export const UserDetailRouter = express.Router()

const userDetailController = new UserDetailController(
    new UserDetailBusiness(
        new UserDatabase(),
        new UserDetailDatabase(),
        new TokenManager()
    )
)

UserDetailRouter.post("/", userDetailController.create)
UserDetailRouter.get("/", userDetailController.get)
UserDetailRouter.delete("/", userDetailController.delete)
UserDetailRouter.put("/", userDetailController.update)
