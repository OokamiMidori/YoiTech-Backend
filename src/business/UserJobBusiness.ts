import { UserJobDatabase } from "../dataBase/UserJobDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserJobBusiness{
    constructor(
        private userJobDatabase: UserJobDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}
}