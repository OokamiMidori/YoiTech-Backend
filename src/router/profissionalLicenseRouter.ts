import express from "express"
import { ProfissionalLicenseController } from "../controller/profissionalLicenseController"
import { ProfissionalLicenseBusiness } from "../business/ProfissionalLicenseBusiness"
import { ProfissionalLicenseDatabase } from "../dataBase/ProfissionalLicenseDatabase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"
import { HashManager } from "../services/HashManager"

export const ProfissionalLicenseRouter = express.Router()

const profissionalLicenseController = new ProfissionalLicenseController(
    new ProfissionalLicenseBusiness(
        new ProfissionalLicenseDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new HashManager()
    )
)

ProfissionalLicenseRouter.post("/", profissionalLicenseController.create)
ProfissionalLicenseRouter.get("/", profissionalLicenseController.get)
ProfissionalLicenseRouter.put("/:id", profissionalLicenseController.edit)
ProfissionalLicenseRouter.delete("/:id", profissionalLicenseController.delete)