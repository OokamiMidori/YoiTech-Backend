import express from "express"
import { JobApplicationController } from "../controller/jobApplicationController"
import { JobApplicationBusiness } from "../business/JobApplicationBusiness"
import { JobApplicationDatabase } from "../dataBase/JobApplicationDatabase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"
import { JobOpportunityDatabase } from "../dataBase/JobOpportunityDatabase"

export const JobApplicationRouter = express.Router()

const jobApplicationController = new JobApplicationController(
    new JobApplicationBusiness(
        new JobApplicationDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new JobOpportunityDatabase()
    )
)

JobApplicationRouter.post("/",jobApplicationController.create)
JobApplicationRouter.put("/accept/:id", jobApplicationController.accept)
JobApplicationRouter.put("/deny/:id", jobApplicationController.deny)
JobApplicationRouter.delete("/:id",jobApplicationController.delete)
JobApplicationRouter.get("/", jobApplicationController.getUserId)