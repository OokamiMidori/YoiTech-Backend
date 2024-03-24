import express from "express"
import { UserMeasurementController } from "../controller/userMeasurementController"
import { UserMeasurimentDetailsBusiness } from "../business/UserMeasurimentDetailsBusiness"
import { UserMeasurementDetailsDatabase } from "../dataBase/UserMeasurementDetailsDatabase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"
import { HashManager } from "../services/HashManager"

export const UserMeasurimentDetailsRouter = express.Router()

const userMeasurimentDetailsController = new UserMeasurementController(
    new UserMeasurimentDetailsBusiness(
        new UserMeasurementDetailsDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new HashManager()
    )
)

UserMeasurimentDetailsRouter.post("/", userMeasurimentDetailsController.create)
UserMeasurimentDetailsRouter.put("/", userMeasurimentDetailsController.edit)
UserMeasurimentDetailsRouter.get("/", userMeasurimentDetailsController.get)
UserMeasurimentDetailsRouter.delete("/:id",userMeasurimentDetailsController.delete)
