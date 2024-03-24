import express from "express"
import { CompanyLogoController } from "../controller/companyLogoController"
import { CompanyLogoBusiness } from "../business/CompanyLogoBusiness"
import { CompanyLogoDatabase } from "../dataBase/CompanyLogoDatabase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"

export const CompanyLogoRouter = express.Router()

const companyLogoController = new CompanyLogoController(
    new CompanyLogoBusiness(
        new CompanyLogoDatabase(),
        new TokenManager(),
        new IdGenerator()
    )
)

CompanyLogoRouter.post("/", companyLogoController.create)
CompanyLogoRouter.get("/:id", companyLogoController.get)
CompanyLogoRouter.put("/:id", companyLogoController.update)
CompanyLogoRouter.delete("/:id", companyLogoController.delete)