import { UserMeasurementDetailsDatabase } from "../dataBase/UserMeasurementDetailsDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserMeasurimentDetailsBusiness {
    constructor(
        private userMeasurimentDatabase: UserMeasurementDetailsDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}
}