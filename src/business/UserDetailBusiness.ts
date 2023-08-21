import { UserDetailDatabase } from "../dataBase/UserDetailDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserDetailBusiness {
    constructor(
        private userDetailDatabase: UserDetailDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ){}
}