import express from "express"
import { MoveDisponibilityController } from "../controller/moveDisponibilityController"
import { MoveDisponibilityBusiness } from "../business/MoveDisponibilityBusiness"
import { MoveDisponibilityDatabase } from "../dataBase/MoveDisponibilityDataBase"
import { TokenManager } from "../services/TokenManager"

export const MoveDisponibilityRouter = express.Router()

const moveDisponibilityController = new MoveDisponibilityController(
    new MoveDisponibilityBusiness(
        new MoveDisponibilityDatabase(),
        new TokenManager()
    )
)

MoveDisponibilityRouter.post("/", moveDisponibilityController.create)
MoveDisponibilityRouter.put("/",moveDisponibilityController.update)
MoveDisponibilityRouter.get("/:id", moveDisponibilityController.get)
MoveDisponibilityRouter.delete("/:id", moveDisponibilityController.delete)