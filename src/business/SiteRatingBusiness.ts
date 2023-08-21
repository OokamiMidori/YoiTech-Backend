import { SiteRatingDatabase } from "../dataBase/SiteRatingDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class SiteRatingBusiness {
    constructor(
        private siteRatingDatabase: SiteRatingDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ){}
}