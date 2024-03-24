import express from "express"
import { SiteRatingController } from "../controller/siteRatingController"
import { SiteRatingBusiness } from "../business/SiteRatingBusiness"
import { SiteRatingDatabase } from "../dataBase/SiteRatingDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { CompanyDatabase } from "../dataBase/CompanyDatabase"

export const SiteRatingRouter = express.Router()

const siteRatingController = new SiteRatingController(
    new SiteRatingBusiness(
        new SiteRatingDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new CompanyDatabase()
    )
)

SiteRatingRouter.post("/:id", siteRatingController.create)
SiteRatingRouter.delete("/:id", siteRatingController.delete)
SiteRatingRouter.get("/ratings", siteRatingController.getRating)