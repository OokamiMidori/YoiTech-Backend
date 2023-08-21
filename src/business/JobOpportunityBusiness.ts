import { JobOpportunityDatabase } from "../dataBase/JobOpportunityDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class JobOpportunityBusiness{
    constructor(
        private jobOpportunityDatabase: JobOpportunityDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}
}