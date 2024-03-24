import express from "express"
import { WorkHistoryController } from "../controller/workHistoryController"
import { WorkHistoryBusiness } from "../business/WorkHistoryBusiness"
import { WorkHistoryDatabase } from "../dataBase/WorkHistoryDatabase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"

export const WorkHistoryRouter = express.Router()

const workHistoryController = new WorkHistoryController(
    new WorkHistoryBusiness(
        new WorkHistoryDatabase(),
        new TokenManager(),
        new IdGenerator()
    )
)

WorkHistoryRouter.post("/", workHistoryController.create)
WorkHistoryRouter.put("/:id", workHistoryController.update)
WorkHistoryRouter.get("/:id", workHistoryController.get)
WorkHistoryRouter.delete("/:id", workHistoryController.delete)