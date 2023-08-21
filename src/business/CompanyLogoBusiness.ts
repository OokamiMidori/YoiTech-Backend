import { CompanyLogoDatabase } from "../dataBase/CompanyLogoDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class CompanyLogoBusiness {
    constructor(
        private companyLogoDatabase: CompanyLogoDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}
}