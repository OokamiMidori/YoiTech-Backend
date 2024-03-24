import express from "express"
import { LineOfBusinessController } from "../controller/LineOfBusinessController"
import { LineOfBusinessBusiness } from "../business/LineOfBusinessBusiness"
import { LineOfBusinessDatabase } from "../dataBase/LineOfBusinessDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { HashManager } from "../services/HashManager"

export const LineOfBusinessRouter = express.Router()

const lineOfBusinessController = new LineOfBusinessController(
    new LineOfBusinessBusiness(
        new LineOfBusinessDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new HashManager()
    )
)

LineOfBusinessRouter.post("/", lineOfBusinessController.create)
LineOfBusinessRouter.get("/", lineOfBusinessController.getLineOfBusiness)
LineOfBusinessRouter.delete(":id", lineOfBusinessController.deleteLineOfBusiness)
LineOfBusinessRouter.put("/id", lineOfBusinessController.editLineOfBusiness)
