import { FunctionPerformedDatabase } from "../dataBase/FunctionPerformedDatabase";
import { FunctionPerformedInputDTO, deleteFunctionPerformedInputDTO, editFunctionPerformedInputDTO, getFunctionPerformedInputDTO, getFunctionPerformedOutputDTO } from "../dtos/FunctionPerformedDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES } from "../services/TokenManager";
import { FunctionPerformed } from "../models/functionPerformed";
import { FunctionPerformedDB } from "../Types";

export class FunctionPerformedBusiness {
    constructor(
        private functionPerformedDatabase: FunctionPerformedDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}

    public createFunctionPerformedDatabase = async (input:FunctionPerformedInputDTO):Promise <void> =>{
        const {token, lineOfBusinessId, content} = input

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

        if(lineOfBusinessId !== "string"){
            throw new BadRequestError("'lineOfBusinessId' deve ser uma string")
        }

        const functionPerformedOk = await this.functionPerformedDatabase.getByContent(content)

        if(functionPerformedOk){
            throw new BadRequestError("Item já existe")
        }

        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()

        const newFunctionPerformed = new FunctionPerformed(
        id,
        lineOfBusinessId,
        content,
        createdAt
        )

        const functionPerformedDB = newFunctionPerformed.toDBModel()
        await this.functionPerformedDatabase.insert(functionPerformedDB)
    }

    public getFunctionPerformed = async (input:getFunctionPerformedInputDTO):Promise<getFunctionPerformedOutputDTO>=>{

        const {token} = input
        
        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const functionPerformedDB: FunctionPerformedDB[] = await this.functionPerformedDatabase.getAll()

        const functionPerformed = functionPerformedDB.map((functionperformedDB)=>{
            const functionPerformed = new FunctionPerformed(
                functionperformedDB.id,
                functionperformedDB.line_of_business_id,
                functionperformedDB.content,
                functionperformedDB.created_at
            )
            return functionPerformed.toBusinessModel()
        })

        return functionPerformed
    }

    public deleteFunctionPerformed = async (input:deleteFunctionPerformedInputDTO):Promise<void>=>{
        const {token, id} = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const functionPerformedDB:FunctionPerformedDB | undefined = await this.functionPerformedDatabase.getById(id)

        if (!functionPerformedDB){
            throw new BadRequestError("'id' não encotrado")
        }

        if(payload.role !== USER_ROLES.ADMIN){
            throw new BadRequestError("Somente Adiministrador pode deletar o item")
        }

        await this.functionPerformedDatabase.delete(id)
    }

    public editFunctionPerformed = async (input:editFunctionPerformedInputDTO):Promise<void>=>{
        const {idToEdit, token, content} = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const functionPerformedDB:FunctionPerformedDB|undefined = await this.functionPerformedDatabase.getById(idToEdit)

        if(!functionPerformedDB){
            throw new BadRequestError("'id' não encontrado")
        }

        if(payload.role !== USER_ROLES.ADMIN){
            throw new BadRequestError("Somente usuário admin pode editar")
        }

        if(content !== "string"){
            throw new BadRequestError("'content' deve ser string")
        }

        const functionPerformed = new FunctionPerformed(
            functionPerformedDB.id,
            functionPerformedDB.line_of_business_id,
            functionPerformedDB.content,
            functionPerformedDB.created_at
        )

        functionPerformed.setContent(content)
        const updatedFunctionPerformed = functionPerformed.toDBModel()

        await this.functionPerformedDatabase.update(idToEdit, updatedFunctionPerformed)
    }
}