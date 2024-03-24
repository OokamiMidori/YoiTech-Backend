import { JobOpportunityDB } from "../Types";
import { JobOpportunityDatabase } from "../dataBase/JobOpportunityDatabase";
import { deleteJobOpportunityInputDTO, getAllJobOpportunityInputDTO, getAllJobOpportunityOutputDTO, insertJobOpportunityInputDTO, updateJobOpportunityInputDTO } from "../dtos/jobOpportunityDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { JobOpportunity } from "../models/jobOpportunity";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES } from "../services/TokenManager";

export class JobOpportunityBusiness {
    constructor(
        private jobOpportunityDatabase: JobOpportunityDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ) { }

    public insertjobOpportunity = async (input: insertJobOpportunityInputDTO): Promise<void> => {
        const { token, functionPerformedId, city, hourlyWage, shift, overtime, minAge, maxAge, japaneseCoversationStatus, japaneseReadingStatus, driverLicense, typeDriverLicense, profissionalLicenseId, minHeight, maxHeight, minWeight, maxWeight, minUniformSize, maxUniformSize, glass, tatoo, pircing, smooker, dominantHand, detailsJobOppotunity, cep, stateProvince} = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if(typeof functionPerformedId !== "string"){
            throw new BadRequestError("'functoinPerformedId' deve ser string")
        }

        if(typeof city !=="string"){
            throw new BadRequestError("'city' deve ser string")
        }

        if(typeof hourlyWage!=="string"){
            throw new BadRequestError("'hourlyWage' deve ser string")
        }

        if(typeof shift !=="string"){
            throw new BadRequestError("'shift' deve ser string")
        }

        if(typeof overtime !== "string"){
            throw new BadRequestError("'overtime' deve ser string")
        }

        if(typeof minAge!=="number"){
            throw new BadRequestError("'minAge' deve ser number")
        }

        if(typeof maxAge !== "number"){
            throw new BadRequestError("'maxAge' deve ser string")
        }

        if(typeof japaneseCoversationStatus !== "number"){
            throw new BadRequestError("'japaneseConversationStatus' deve ser number")
        }

        if(typeof japaneseReadingStatus !== "number"){
            throw new BadRequestError("'japaneseReadingStatus' deve ser number")
        }

        if(typeof driverLicense !== "string"){
            throw new BadRequestError("'driverLicense' deve ser string")
        }


        if(typeof typeDriverLicense !=="string"){
            throw new BadRequestError("'typeOfDriverLicense' deve ser string")
        }

        if(typeof profissionalLicenseId !=="string"){
            throw new BadRequestError("'profissionalLicenseId' deve ser string")
        }

        if(typeof maxHeight !=="number"){
            throw new BadRequestError("'maxHeight' deve ser number")
        }

        if(typeof minHeight !=="number"){
            throw new BadRequestError("'minHeight' deve ser um number")
        }

        if(typeof minWeight!=="number"){
            throw new BadRequestError("'minWeight' deve ser number")
        }

        if(typeof maxWeight !=="number"){
            throw new BadRequestError("'maxWeight' deve ser number")
        }

        if(typeof minUniformSize !== "string"){
            throw new BadRequestError("'minUniformSize' deve ser string")
        }

        if(typeof maxUniformSize !=="string"){
            throw new BadRequestError("'maxUniformSize' deve ser string")
        }

        if(typeof glass !=="string"){
            throw new BadRequestError("'glasse' deve ser string")
        }

        if(typeof tatoo !=="string"){
            throw new BadRequestError("'tatoo' deve ser string")
        }

        if(typeof smooker !=="string"){
            throw new BadRequestError("'smooker' deve ser string")
        }

        if(typeof dominantHand !=="string"){
            throw new BadRequestError("'dominantHand' deve ser string")
        }

        if(typeof detailsJobOppotunity !== "string"){
            throw new BadRequestError("'detailsJobOpportunity' deve ser string")
        }


        if(typeof pircing !== "string"){
            throw new BadRequestError("'pircing' deve ser string")
        }

        if(typeof cep !== "string"){
            throw new BadRequestError("'cep' deve ser string")
        }

        if(typeof stateProvince !== "string"){
            throw new BadRequestError("'stateProvince' deve ser string")
        }

        const createdAt = new Date().toISOString()

        const id = this.idGenerator.generate()

        const evaluation = 0

        const jobOpportunity = new JobOpportunity(
            id,
            payload.id,
            functionPerformedId,
            city,
            cep,
            stateProvince,
            hourlyWage,
            shift,
            overtime,
            minAge,
            maxAge,
            japaneseCoversationStatus,
            japaneseReadingStatus,
            driverLicense,
            typeDriverLicense,
            profissionalLicenseId,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            minUniformSize,
            maxUniformSize,
            glass,
            tatoo,
            pircing,
            smooker,
            dominantHand,
            detailsJobOppotunity,
            evaluation,
            createdAt
        )

        const jobOpportunityDB = jobOpportunity.toDBModel()

        await this.jobOpportunityDatabase.insert(jobOpportunityDB)

    }

    public deleteJobOpportunity = async (input:deleteJobOpportunityInputDTO):Promise<void>=>{
        const {token, idToDelete} = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const jobOpportunityexist = await this.jobOpportunityDatabase.getById(idToDelete)

        if(!jobOpportunityexist){
            throw new BadRequestError("idToDelete inválido")
        }

        if(payload.role !== USER_ROLES.ADMIN && payload.id !== jobOpportunityexist.company_id){
            throw new BadRequestError("Sómente o quem criou o objeto pode deletar")
        }

        await this.jobOpportunityDatabase.delete(idToDelete)
    }

    public updateJobOpportunity = async (input:updateJobOpportunityInputDTO):Promise<void>=>{
        const { token, idToUpdate, functionPerformedId, city, hourlyWage, shift, overtime, minAge, maxAge, japaneseCoversationStatus, japaneseReadingStatus, driverLicense, typeDriverLicense, profissionalLicenseId, minHeight, maxHeight, minWeight, maxWeight, minUniformSize, maxUniformSize, glass, tatoo, pircing, smooker, dominantHand, detailsJobOppotunity, cep, stateProvince, evaluation} = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if(typeof functionPerformedId !== "string"){
            throw new BadRequestError("'functoinPerformedId' deve ser string")
        }

        if(typeof city !=="string"){
            throw new BadRequestError("'city' deve ser string")
        }

        if(typeof hourlyWage!=="string"){
            throw new BadRequestError("'hourlyWage' deve ser string")
        }

        if(typeof shift !=="string"){
            throw new BadRequestError("'shift' deve ser string")
        }

        if(typeof overtime !== "string"){
            throw new BadRequestError("'overtime' deve ser string")
        }

        if(typeof minAge!=="number"){
            throw new BadRequestError("'minAge' deve ser number")
        }

        if(typeof maxAge !== "number"){
            throw new BadRequestError("'maxAge' deve ser string")
        }

        if(typeof japaneseCoversationStatus !== "number"){
            throw new BadRequestError("'japaneseConversationStatus' deve ser number")
        }

        if(typeof japaneseReadingStatus !== "number"){
            throw new BadRequestError("'japaneseReadingStatus' deve ser number")
        }

        if(typeof driverLicense !== "string"){
            throw new BadRequestError("'driverLicense' deve ser string")
        }


        if(typeof typeDriverLicense !=="string"){
            throw new BadRequestError("'typeOfDriverLicense' deve ser string")
        }

        if(typeof profissionalLicenseId !=="string"){
            throw new BadRequestError("'profissionalLicenseId' deve ser string")
        }

        if(typeof maxHeight !=="number"){
            throw new BadRequestError("'maxHeight' deve ser number")
        }

        if(typeof minHeight !=="number"){
            throw new BadRequestError("'minHeight' deve ser um number")
        }

        if(typeof minWeight!=="number"){
            throw new BadRequestError("'minWeight' deve ser number")
        }

        if(typeof maxWeight !=="number"){
            throw new BadRequestError("'maxWeight' deve ser number")
        }

        if(typeof minUniformSize !== "string"){
            throw new BadRequestError("'minUniformSize' deve ser string")
        }

        if(typeof maxUniformSize !=="string"){
            throw new BadRequestError("'maxUniformSize' deve ser string")
        }

        if(typeof glass !=="string"){
            throw new BadRequestError("'glasse' deve ser string")
        }

        if(typeof tatoo !=="string"){
            throw new BadRequestError("'tatoo' deve ser string")
        }

        if(typeof smooker !=="string"){
            throw new BadRequestError("'smooker' deve ser string")
        }

        if(typeof dominantHand !=="string"){
            throw new BadRequestError("'dominantHand' deve ser string")
        }

        if(typeof detailsJobOppotunity !== "string"){
            throw new BadRequestError("'detailsJobOpportunity' deve ser string")
        }


        if(typeof pircing !== "string"){
            throw new BadRequestError("'pircing' deve ser string")
        }

        if(typeof cep !== "string"){
            throw new BadRequestError("'cep' deve ser string")
        }

        if(typeof stateProvince !== "string"){
            throw new BadRequestError("'stateProvince' deve ser string")
        }

        if(typeof evaluation !== "number"){
            throw new BadRequestError("'evaluation' deve ser number")
        }

        if(typeof idToUpdate !== "string"){
            throw new BadRequestError("'idToUpdate' deve ser string")
        }

        const jobOpportunityExist = await this.jobOpportunityDatabase.getById(idToUpdate)

        if(!jobOpportunityExist){
            throw new BadRequestError("id inválido")
        }

        const jobOpportunity = new JobOpportunity(
            jobOpportunityExist.id,
           jobOpportunityExist.company_id,
            functionPerformedId,
            city,
            cep,
            stateProvince,
            hourlyWage,
            shift,
            overtime,
            minAge,
            maxAge,
            japaneseCoversationStatus,
            japaneseReadingStatus,
            driverLicense,
            typeDriverLicense,
            profissionalLicenseId,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            minUniformSize,
            maxUniformSize,
            glass,
            tatoo,
            pircing,
            smooker,
            dominantHand,
            detailsJobOppotunity,
            evaluation,
            jobOpportunityExist.created_at
        )

        const jobOpportunityDB = jobOpportunity.toDBModel()

        await this.jobOpportunityDatabase.update(idToUpdate, jobOpportunityDB)

    }

    public getJobOpportunity = async (input:getAllJobOpportunityInputDTO):Promise<getAllJobOpportunityOutputDTO>=>{
        const {token} = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const jobOpportunityList:JobOpportunityDB[] = await this.jobOpportunityDatabase.getAllJobOpportunity()

        const jobOpportunitys = jobOpportunityList.map((jobOpportunityDB)=>{
            const jobOpportunity = new JobOpportunity(
                jobOpportunityDB.id,
                jobOpportunityDB.company_id,
                jobOpportunityDB.function_performed_id,
                jobOpportunityDB.city,
                jobOpportunityDB.cep,
                jobOpportunityDB.state_province,
                jobOpportunityDB.hourly_wage,
                jobOpportunityDB.shift,
                jobOpportunityDB.overtime,
                jobOpportunityDB.min_age,
                jobOpportunityDB.max_age,
                jobOpportunityDB.japanese_coversation_status,
                jobOpportunityDB.japanese_reading_status,
                jobOpportunityDB.driver_license,
                jobOpportunityDB.type_driver_license,
                jobOpportunityDB.profissional_license_id,
                jobOpportunityDB.min_height,
                jobOpportunityDB.max_height,
                jobOpportunityDB.min_weight,
                jobOpportunityDB.max_weight,
                jobOpportunityDB.min_uniform_size,
                jobOpportunityDB.max_uniform_size,
                jobOpportunityDB.glass,
                jobOpportunityDB.tatoo,
                jobOpportunityDB.pircing,
                jobOpportunityDB.smooker,
                jobOpportunityDB.dominant_hand,
                jobOpportunityDB.details_job_oppotunity,
                jobOpportunityDB.evaluation,
                jobOpportunityDB.created_at
            )
            return jobOpportunity.toBusinessModel()
        })

        return jobOpportunitys
    }
}