import { ProfissionalLicenseDB } from "../Types";
import { ProfissionalLicenseDatabase } from "../dataBase/ProfissionalLicenseDatabase";
import { ProfissionalLicenseInputDTO, deleteProfissionalLicenseInputDTO, editProfissionalLicenseInputDTO, getProfissionalLicenseInputDTO, getProfissionalLicenseOutputDTO } from "../dtos/profissionalLicenseDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { ProfissionalLicense } from "../models/profissionalLIcense";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES } from "../services/TokenManager";

export class ProfissionalLicenseBusiness {
    constructor(
        private profissionalLicenseDatabase: ProfissionalLicenseDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ) { }

    public createProfissionalLicense = async (input: ProfissionalLicenseInputDTO): Promise<void> => {
        const { token, content } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (content !== "string") {
            throw new BadRequestError("'content' dever ser string")
        }

        const profissionalLicenseOk = await this.profissionalLicenseDatabase.getByContent(content)

        if (profissionalLicenseOk) {
            throw new BadRequestError("Item já existe")
        }

        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()

        const newProfissionalLicense = new ProfissionalLicense(
            id,
            content,
            createdAt
        )

        const ProfissionalLicenseDB = newProfissionalLicense.toDBModel()

        await this.profissionalLicenseDatabase.insert(ProfissionalLicenseDB)
    }

    public getProfissionalLicense = async (input: getProfissionalLicenseInputDTO): Promise<getProfissionalLicenseOutputDTO> => {
        const { token } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const profissionalLicenseDB: ProfissionalLicenseDB[] =
            await this.profissionalLicenseDatabase.getAllProfissionalLicensenses()

        const profissionalLicense = profissionalLicenseDB.map((profissionalLicenseDB) => {
            const profissionalLicense = new ProfissionalLicense(
                profissionalLicenseDB.id,
                profissionalLicenseDB.content,
                profissionalLicenseDB.created_at
            )
            return profissionalLicense.toBusinessModel()
        })

        return profissionalLicense
    }

    public deleteProfissionalLicense = async (input: deleteProfissionalLicenseInputDTO): Promise<void> => {
        const { token, idToDelete } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const profissionalLicenseDB: ProfissionalLicenseDB | undefined = await this.profissionalLicenseDatabase.getById(idToDelete)

        if(!profissionalLicenseDB){
            throw new BadRequestError("'id' não encontrado")
        }

        if (payload.role !== USER_ROLES.ADMIN){
            throw new BadRequestError("Somente adiministrador pode deletar")
        }

        await this.profissionalLicenseDatabase.delete(idToDelete)
    }

    public editProfissionalLicense = async (input:editProfissionalLicenseInputDTO):Promise<void>=>{
        const {idToEdit, token, content} = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const profissionalLicenseDB:ProfissionalLicenseDB|undefined = await this.profissionalLicenseDatabase.getById(idToEdit)

        if(!profissionalLicenseDB){
            throw new BadRequestError("'id' inválido")
        }

        if(payload.role !== USER_ROLES.ADMIN){
            throw new BadRequestError("Somente o administrador pode editar")
        }

        if(content !== "string"){
            throw new BadRequestError("'content' deve ser string")
        }

        const profissionalLicense = new ProfissionalLicense(
            profissionalLicenseDB.id,
            profissionalLicenseDB.content,
            profissionalLicenseDB.created_at
        )

        profissionalLicense.setContent(content)
        const updatedProfissionalLicense = profissionalLicense.toDBModel()

        await this.profissionalLicenseDatabase.update(idToEdit, updatedProfissionalLicense)

    }
}