import { StateProvinceDatabase } from "../dataBase/StateProvinceDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class StateProvinceBusiness {
    constructor(
        private stateProvinceDatabase: StateProvinceDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}
}