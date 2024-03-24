import { WorkHistoryDB } from "../Types";
import { WorkHistoryDatabase } from "../dataBase/WorkHistoryDatabase";
import { createWorkHistoryInputDTO, deleteWorkHistoryInputDTO, getWorkHistoryInputDTO, getWorkHistoryOutputDTO, updateWorkHistoryInputDTO } from "../dtos/workHistoryDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { WorkHisotry } from "../models/workHistory";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES } from "../services/TokenManager";

export class WorkHistoryBusiness {
    constructor(
        private workHistoryDatabase: WorkHistoryDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator
    ) { }

    public createWorkHistory = async (input: createWorkHistoryInputDTO): Promise<void> => {
        const { token, companyName, factoryName, stateProvince, lineOfBusiness, startTime, endTime, functionPerformedId, reasonTermination } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof companyName !== "string") {
            throw new BadRequestError("'companyName' deve ser string")
        }
        if (typeof factoryName !== "string") {
            throw new BadRequestError("'factoryName' deve ser string")
        }
        if (typeof stateProvince !== "string") {
            throw new BadRequestError("'stateProvince' deve ser string")
        }
        if (typeof lineOfBusiness !== "string") {
            throw new BadRequestError("'lineOfBusiness' deve ser string")
        }
        if (typeof startTime !== "string") {
            throw new BadRequestError("'startTime' deve ser string")
        }
        if (typeof endTime !== "string") {
            throw new BadRequestError("'endTime' deve ser string")
        }
        if (typeof functionPerformedId !== "string") {
            throw new BadRequestError("'functionPerformedId' deve ser string")
        }
        if (typeof reasonTermination !== "string") {
            throw new BadRequestError("'reasonTermination' deve ser string")
        }

        const createdAt = new Date().toISOString()
        const id = this.idGenerator.generate()
        const userId = payload.id

        const workHistory = new WorkHisotry(
            id,
            userId,
            companyName,
            factoryName,
            stateProvince,
            lineOfBusiness,
            startTime,
            endTime,
            functionPerformedId,
            reasonTermination,
            createdAt
        )

        const workHistoryDB = workHistory.toDBModel()

        await this.workHistoryDatabase.insert(workHistoryDB)

    }

    public getWorkHistory = async (input: getWorkHistoryInputDTO): Promise<getWorkHistoryOutputDTO> => {
        const { token, idToFind } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const workyHistoryConjunto: WorkHistoryDB[] = await this.workHistoryDatabase.getByUserId(idToFind)

        const workHistorys = workyHistoryConjunto.map((workHistoryDB) => {
            const workHistory = new WorkHisotry(
                workHistoryDB.id,
                workHistoryDB.user_id,
                workHistoryDB.company_name,
                workHistoryDB.factory_name,
                workHistoryDB.state_province,
                workHistoryDB.line_of_business,
                workHistoryDB.start_time,
                workHistoryDB.end_time,
                workHistoryDB.function_performed_id,
                workHistoryDB.reason_termination,
                workHistoryDB.created_at
            )
            return workHistory.toBusinessModel()
        })

        return workHistorys
    }

    public deleteWorkHistory = async (input: deleteWorkHistoryInputDTO): Promise<void> => {
        const { token, idToDelete } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof idToDelete !== "string") {
            throw new BadRequestError("'idToDelete' deve ser string")
        }

        const workHistoryDB = await this.workHistoryDatabase.getById(idToDelete)

        if (!workHistoryDB) {
            throw new BadRequestError("Item não existe")
        }

        if (payload.role !== USER_ROLES.ADMIN && payload.id !== workHistoryDB.user_id) {
            throw new BadRequestError("Somente o criador pode deletar")
        }

        await this.workHistoryDatabase.delete(idToDelete)
    }

    public updateWorkHistory = async (input: updateWorkHistoryInputDTO): Promise<void> => {
        const { token, companyName, factoryName, stateProvince, lineOfBusiness, startTime, endTime, functionPerformedId, reasonTermination, idToUpdate } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof companyName !== "string") {
            throw new BadRequestError("'companyName' deve ser string")
        }

        if (typeof factoryName !== "string") {
            throw new BadRequestError("'factoryName' deve ser string")
        }

        if (typeof stateProvince !== "string") {
            throw new BadRequestError("'stateProvince' deve ser string")
        }

        if (typeof lineOfBusiness !== "string") {
            throw new BadRequestError("'lineOfBusiness' deve ser string")
        }

        if (typeof startTime !== "string") {
            throw new BadRequestError("'startTime' deve ser string")
        }

        if (typeof endTime !== "string") {
            throw new BadRequestError("'endTime' deve ser string")
        }

        if (typeof functionPerformedId !== "string") {
            throw new BadRequestError("'functionPerformedId' deve ser string")
        }

        if (typeof reasonTermination !== "string") {
            throw new BadRequestError("'reasonTermination' deve ser string")
        }

        if (typeof idToUpdate !== "string") {
            throw new BadRequestError("'idToUpdate' deve ser string")
        }

        const workHistoryExist = await this.workHistoryDatabase.getById(idToUpdate)

        if (!workHistoryExist) {
            throw new BadRequestError("'idToUpdate' inválido")
        }

        const workHistory = new WorkHisotry(
            payload.id,
            idToUpdate,
            companyName,
            factoryName,
            stateProvince,
            lineOfBusiness,
            startTime,
            endTime,
            functionPerformedId,
            reasonTermination,
            workHistoryExist.created_at
        )

        const workHistoryDB = workHistory.toDBModel()

        await this.workHistoryDatabase.update(idToUpdate, workHistoryDB)
    }
}