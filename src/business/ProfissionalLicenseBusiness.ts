import { ProfissionalLicenseDatabase } from "../dataBase/ProfissionalLicenseDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class ProfissionalLicenseBusiness {
    constructor(
        private profissionalLicenseDatabase: ProfissionalLicenseDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}
}