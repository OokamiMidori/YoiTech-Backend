import { DrivingLicenseTypeDatabase } from "../dataBase/DrivingLicenseTypeDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class DrivingLicenseTypeBusiness {
    constructor(
        private drivingLicenseDatabase: DrivingLicenseTypeDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}
}