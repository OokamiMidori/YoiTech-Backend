import express from "express"
import { UserAdressController } from "../controller/userAdressController"
import { UserAdressBusiness } from "../business/UserAdressBusiness"
import { UserAdressDatabase } from "../dataBase/UserAdressDatabase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"
import { HashManager } from "../services/HashManager"

export const UserAdressRouter = express.Router()

const userAdressController = new UserAdressController(
    new UserAdressBusiness(
        new UserAdressDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new HashManager()
    )
)

UserAdressRouter.post("/", userAdressController.create)
UserAdressRouter.get("/", userAdressController.get)
UserAdressRouter.put("/:id", userAdressController.update)
UserAdressRouter.delete("/:id", userAdressController.delete)