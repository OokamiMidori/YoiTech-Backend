import { RatingCompanyDatabase } from "../dataBase/RatingCompanyDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class RatingCompanyBusiness {
    constructor(
        private ratingCompanyDatabase: RatingCompanyDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}
}