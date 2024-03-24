import express from "express"
import { CompanyController } from "../controller/companyController"
import { CompanyBusiness } from "../business/CompanyBusiness"
import { CompanyDatabase } from "../dataBase/CompanyDatabase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"
import { HashManager } from "../services/HashManager"

export const CompanyRouter = express.Router()

const companyController = new CompanyController(
    new CompanyBusiness(
        new CompanyDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new HashManager()
    )
)

CompanyRouter.post("/signup", companyController.signup)
CompanyRouter.post("/login", companyController.login)
CompanyRouter.put("/emailActivation", companyController.emailActivation)
CompanyRouter.get("/company", companyController.get)