import { FunctionPerformedDatabase } from "../dataBase/FunctionPerformedDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class FunctionPerformedBusiness {
    constructor(
        private functionPerformedDatabase: FunctionPerformedDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}
}