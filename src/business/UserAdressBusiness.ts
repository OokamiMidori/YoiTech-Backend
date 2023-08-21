import { UserAdressDatabase } from "../dataBase/UserAdressDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserAdressBusiness {
    constructor(
        private userAdressDatabase: UserAdressDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}
}