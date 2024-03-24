import { LineOfBusinessDB } from "../Types";
import { LineOfBusinessDatabase } from "../dataBase/LineOfBusinessDatabase";
import { EditLineOfBusinessInputDTO, GetLineOfBusinessInputDTO, GetLineOfBusinessOutputDTO, LineOfBusinessInputDTO, deleteLineOfBusinessInputDTO } from "../dtos/lineOfBusinessDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { LineOfBusiness } from "../models/LineOfBusiness";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES } from "../services/TokenManager";

export class LineOfBusinessBusiness {
    constructor(
        private lineOfBusinessDatabase: LineOfBusinessDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ) { }

    public createLineOfBusiness = async (input: LineOfBusinessInputDTO): Promise<void> => {
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

        const lineOfBusinessOk = await this.lineOfBusinessDatabase.getLineOfBusinessByContent(content)

        if (lineOfBusinessOk) {
            throw new BadRequestError("Item já existe")
        }

        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()


        const newLineOfBusiness = new LineOfBusiness(
            id,
            content,
            createdAt
        )

        const LineOfBusinessDB = newLineOfBusiness.toDBModel()

        await this.lineOfBusinessDatabase.insert(LineOfBusinessDB)
    }

    public getLineOfBusiness = async (input: GetLineOfBusinessInputDTO): Promise<GetLineOfBusinessOutputDTO> => {
        const { token } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const lineOfBusinessDB: LineOfBusinessDB[] =
            await this.lineOfBusinessDatabase.getAllLineOfBusiness()

        const lineOfBusiness = lineOfBusinessDB.map((lineOfBusinessDB) => {
            const lineOfBusiness = new LineOfBusiness(
                lineOfBusinessDB.id,
                lineOfBusinessDB.content,
                lineOfBusinessDB.created_at
            )
            return lineOfBusiness.toBusinessModel()
        })

        return lineOfBusiness
    }

    public deleteLineOfBusiness = async (input: deleteLineOfBusinessInputDTO): Promise<void> => {
        const { token, id } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const lineOfBusinessDB: LineOfBusinessDB | undefined = await this.lineOfBusinessDatabase.getById(id)

        if (!lineOfBusinessDB) {
            throw new BadRequestError("'id' não encontrado")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new BadRequestError("Somente o Adiministrador pode deletar")
        }

        await this.lineOfBusinessDatabase.delete(id)
    }

    public editLineOfBusiness = async (input: EditLineOfBusinessInputDTO): Promise<void> => {
        const { idToEdit, token, content } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const lineOfBusinessDB: LineOfBusinessDB | undefined = await this.lineOfBusinessDatabase.getById(idToEdit)

        if (!lineOfBusinessDB) {
            throw new BadRequestError("'id' não encontrado")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new BadRequestError("Somente o Adiministrador pode editar")
        }

        if (content !== "string") {
            throw new BadRequestError("'content' deve ser string")
        }

        const lineOfBusiness = new LineOfBusiness(
            lineOfBusinessDB.id,
            lineOfBusinessDB.content,
            lineOfBusinessDB.created_at
        )
        lineOfBusiness.setContent(content)
        const updatedLineOfBusiness = lineOfBusiness.toDBModel()

        await this.lineOfBusinessDatabase.update(idToEdit, updatedLineOfBusiness)
    }
}