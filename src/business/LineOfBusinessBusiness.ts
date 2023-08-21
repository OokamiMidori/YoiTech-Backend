import { LineOfBusinessDatabase } from "../dataBase/LineOfBusinessDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class LineOfBusinessBusiness {
    constructor(
        private lineOfBusinessDatabase: LineOfBusinessDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}
}