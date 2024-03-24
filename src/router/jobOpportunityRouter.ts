import express from "express"
import { JobOpportunityController } from "../controller/jobOpportunityController"
import { JobOpportunityBusiness } from "../business/JobOpportunityBusiness"
import { JobOpportunityDatabase } from "../dataBase/JobOpportunityDatabase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"
import { HashManager } from "../services/HashManager"

export const JobOpportunityRouter = express.Router()

const jobOpportunityController = new JobOpportunityController(
    new JobOpportunityBusiness(
        new JobOpportunityDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new HashManager()
    )
)

JobOpportunityRouter.post("/", jobOpportunityController.create)
JobOpportunityRouter.delete("/:id", jobOpportunityController.delete)
JobOpportunityRouter.put("/:id",jobOpportunityController.update)
JobOpportunityRouter.get("/", jobOpportunityController.get)