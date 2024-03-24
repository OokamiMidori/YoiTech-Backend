import express from "express"
import { DrivingLicenseTypeController } from "../controller/drivingLicenseTypeController"
import { DrivingLicenseTypeBusiness } from "../business/DrivingLicenseTypeBusiness"
import { DrivingLicenseTypeDatabase } from "../dataBase/DrivingLicenseTypeDatabase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"
import { HashManager } from "../services/HashManager"

export const DrivingLicenseTypeRouter = express.Router()

const drivingLicenseTypeController = new DrivingLicenseTypeController(
    new DrivingLicenseTypeBusiness(
        new DrivingLicenseTypeDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new HashManager()
    )
)

DrivingLicenseTypeRouter.post("/", drivingLicenseTypeController.create)
DrivingLicenseTypeRouter.get("/", drivingLicenseTypeController.get)