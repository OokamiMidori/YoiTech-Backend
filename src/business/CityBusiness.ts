import { CityDatabase } from "../dataBase/CityDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";


export class CityBusiness {
    constructor(
        private cityDatabase: CityDatabase,
        private tokenManager: TokenManager,
        private hashManager: HashManager,
        private idGanarator: IdGenerator
    ){}
}