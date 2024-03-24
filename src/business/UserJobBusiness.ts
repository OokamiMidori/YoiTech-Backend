import { USER_ROLES, UserJobDB } from "../Types";
import { UserJobDatabase } from "../dataBase/UserJobDatabase";
import { createUserJobInputDTO, deleteUserJobDTO, editUserJobInputDTO, getUserJobInputDTO, getUserJobOutputDTO } from "../dtos/userJobDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { UserJob } from "../models/userJob";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserJobBusiness{
    constructor(
        private userJobDatabase: UserJobDatabase,
        private tokenManager: TokenManager
    ){}

    public createUserJob = async (input:createUserJobInputDTO):Promise<void>=>{
        const {token, workingStatus, salaryClaim, startUpForecast, overtimeAvailability} = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if(typeof workingStatus !== "string"){
            throw new BadRequestError("'workingStatus' deve ser string")
        }

        if(typeof salaryClaim !== "string"){
            throw new BadRequestError("'salaryClaim' deve ser string")
        }

        if(typeof startUpForecast !== "string"){
            throw new BadRequestError("'startUpForecast' deve ser string")
        }

        if(typeof overtimeAvailability !== "string"){
            throw new BadRequestError("'overtimeAvailabiliti' deve ser string")
        }

        const userJobExistente:UserJobDB|undefined = await this.userJobDatabase.findById(payload.id)
        
        if(userJobExistente){
            throw new BadRequestError("'User Job' existente")
        }

        const userJob = new UserJob(
            payload.id,
            workingStatus,
            salaryClaim,
            startUpForecast,
            overtimeAvailability
        )

        const userJobDB = userJob.toDBModel()

        await this.userJobDatabase.insert(userJobDB)
    }

    public getUserJob = async (input:getUserJobInputDTO):Promise <getUserJobOutputDTO>=>{
        const {token} = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const userJobDB = await this.userJobDatabase.findById(payload.id)

        if(!userJobDB){
            throw new BadRequestError("User Job não cadastrado.")
        }

        const userJob = new UserJob(
        userJobDB.user_id,
        userJobDB.working_status,
        userJobDB.salary_claim,
        userJobDB.start_up_forecast,
        userJobDB.overtime_availability
        )

        const userJobBusiness = userJob.toBusinessModel()

        return userJobBusiness
    }

    public deleteUserJob = async (input:deleteUserJobDTO):Promise<void>=>{
        const {token, idToDelete} = input

        
        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const userJobDB = await this.userJobDatabase.findById(payload.id)

        if(!userJobDB){
            throw new BadRequestError("User Job não cadastrado.")
        }

        if(typeof idToDelete !== "string"){
            throw new BadRequestError("'idToDelete' deve ser string.")
        }

        if(payload.role !== USER_ROLES.ADMIN && payload.id !== idToDelete){
            throw new BadRequestError("Somente o usuário que criou ou um usuário ADM pode editar esse item")
        }

        await this.userJobDatabase.delete(idToDelete)

    }

    public editUserJob = async (input:editUserJobInputDTO):Promise <void>=>{
        const {token, workingStatus, salaryClaim, startUpForecast, overtimeAvailability} = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if(typeof workingStatus !== "string"){
            throw new BadRequestError("'workingStatus' deve ser string")
        }

        if(typeof salaryClaim !== "string"){
            throw new BadRequestError("'salaryClaim' deve ser string")
        }

        if(typeof startUpForecast !== "string"){
            throw new BadRequestError("'startUpForecast' deve ser string")
        }

        if(typeof overtimeAvailability !== "string"){
            throw new BadRequestError("'overtimeAvailabiliti' deve ser string")
        }

        const userJobExistente:UserJobDB|undefined = await this.userJobDatabase.findById(payload.id)
        
        if(!userJobExistente){
            throw new BadRequestError("'User Job' não existente")
        }

        const id = payload.id

        const userJob = new UserJob(
            id,
            workingStatus,
            salaryClaim,
            startUpForecast,
            overtimeAvailability
        )

        const userJobDB = userJob.toDBModel()

        await this.userJobDatabase.update(id,userJobDB)        
    }
}