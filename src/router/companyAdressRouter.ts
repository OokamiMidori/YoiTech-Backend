import express from "express"
import { CompanyAdressController } from "../controller/companyAdressController"
import { CompanyAdressBusiness } from "../business/CompanyAdressBusiness"
import { CompanyAdressDatabase } from "../dataBase/CompanyAdressDatabase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"

export const CompanyAdressRouter = express.Router()

const companyAdressController = new CompanyAdressController(
    new CompanyAdressBusiness(
        new CompanyAdressDatabase(),
        new TokenManager(),
        new IdGenerator()
    )
)

CompanyAdressRouter.post("/", companyAdressController.create)
CompanyAdressRouter.delete("/:id", companyAdressController.delete)
CompanyAdressRouter.put("/:id", companyAdressController.update)
CompanyAdressRouter.get("/:id", companyAdressController.get)