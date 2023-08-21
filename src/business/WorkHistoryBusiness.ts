import { WorkHistoryDatabase } from "../dataBase/WorkHistoryDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class WorkHistoryBusiness {
    constructor(
        private workHistoryDatabase: WorkHistoryDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}
}