import express from "express"
import { FunctionPerformedController } from "../controller/functionPerformedController"
import { FunctionPerformedBusiness } from "../business/FunctionPerformedBusiness"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"
import { HashManager } from "../services/HashManager"
import { FunctionPerformedDatabase } from "../dataBase/FunctionPerformedDatabase"

export const FunctionPerformedRouter = express.Router()

const functionPerformedController = new FunctionPerformedController(
    new FunctionPerformedBusiness(
        new FunctionPerformedDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new HashManager()
    )
)

FunctionPerformedRouter.post("/", functionPerformedController.create)
FunctionPerformedRouter.get("/", functionPerformedController.getFunctionPerformed)
FunctionPerformedRouter.delete("/:id", functionPerformedController.deleteFunctionPerformed)
FunctionPerformedRouter.put("/:id", functionPerformedController.updateFunctionPerformed)