import { CompanyAdressDatabase } from "../dataBase/CompanyAdressDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class CompanyAdressBusiness {
    constructor(
        private companyAdressDatabase: CompanyAdressDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}
}