import express from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../dataBase/UserDatabase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"
import { HashManager } from "../services/HashManager"
import { UserController } from "../controller/userController"

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)

userRouter.post("/signup", userController.signup)
userRouter.post("/login",userController.login)
userRouter.put("/emailActivation",userController.emailActivation)
userRouter.post("/signupadmin", userController.createUserAdmin)
userRouter.get("/:id", userController.getUser)