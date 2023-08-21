import { RegionDatabase } from "../dataBase/RegionDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class RegionBusiness {
    constructor(
        private regionDatabase: RegionDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}
}