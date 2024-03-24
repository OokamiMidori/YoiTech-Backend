import express from "express"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"
import { RatingCompanyController } from "../controller/ratingCompanyController"
import { RatingCompanyBusiness } from "../business/RatingCompanyBusiness"
import { RatingCompanyDatabase } from "../dataBase/RatingCompanyDatabase"
import { JobApplicationDatabase } from "../dataBase/JobApplicationDatabase"

export const RatingCompanyRouter = express.Router()

const ratingCompanyController = new RatingCompanyController(
    new RatingCompanyBusiness(
        new RatingCompanyDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new JobApplicationDatabase()
    )
)

RatingCompanyRouter.post("/:id", ratingCompanyController.create)
RatingCompanyRouter.delete("/:id", ratingCompanyController.delete)
RatingCompanyRouter.get("/", ratingCompanyController.getRatingCompanyId)