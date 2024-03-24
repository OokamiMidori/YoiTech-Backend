import express from "express"
import { UserJobController } from "../controller/userJobController"
import { UserJobBusiness } from "../business/UserJobBusiness"
import { UserJobDatabase } from "../dataBase/UserJobDatabase"
import { TokenManager } from "../services/TokenManager"

export const UserJobRouter = express.Router()

const userJobController = new UserJobController(
    new UserJobBusiness(
        new UserJobDatabase(),
        new TokenManager()
    )
)

UserJobRouter.post("/", userJobController.create)
UserJobRouter.get("/", userJobController.get)
UserJobRouter.delete("/:id", userJobController.delete)
UserJobRouter.put("/", userJobController.edit)