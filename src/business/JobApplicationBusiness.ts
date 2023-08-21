import { JobApplicationDatabase } from "../dataBase/JobApplicationDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class JobApplicationBusiness {
    constructor(
        private jobApplicationDatabase: JobApplicationDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}
}