import { APPLICATION_STATUS, JobApplicationDB } from "../Types";
import { JobApplicationDatabase } from "../dataBase/JobApplicationDatabase";
import { JobOpportunityDatabase } from "../dataBase/JobOpportunityDatabase";
import { acceptApplicationInputDTO, deleteJobApplicationInputDTO, dennyApplicationInputDTO, getJobApplicationInputDTO, getJobApplicationOutputDTO, isertJobApplicationInputDTO } from "../dtos/jobApplicationDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { JobApplication } from "../models/jobApplication";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES } from "../services/TokenManager";

export class JobApplicationBusiness {
    constructor(
        private jobApplicationDatabase: JobApplicationDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private jobOpportunity: JobOpportunityDatabase
    ) { }

    public insertJobApplication = async (input: isertJobApplicationInputDTO): Promise<void> => {
        const { token, jobOpportunityId } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof jobOpportunityId !== "string") {
            throw new BadRequestError("'jobOpportunityId' deve ser string")
        }

        const userId = payload.id
        const id = this.idGenerator.generate()
        const status = APPLICATION_STATUS.ESPERA
        const createdAt = new Date().toISOString()

        const jobApplicationExist = await this.jobApplicationDatabase.getByUserID(userId)

        if (jobApplicationExist) {
            throw new BadRequestError("Usuário já inscrito")
        }

        const jobApplication = new JobApplication(
            id,
            jobOpportunityId,
            userId,
            status,
            createdAt
        )

        const jobApplicationDB = jobApplication.toDBModel()

        await this.jobApplicationDatabase.insert(jobApplicationDB)
    }

    public acceptApplication = async (input: acceptApplicationInputDTO): Promise<void> => {
        const { token, idApplication } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof idApplication !== "string") {
            throw new BadRequestError("'idApplication' deve ser string")
        }

        const jobApplicationExist = await this.jobApplicationDatabase.getById(idApplication)

        if (!jobApplicationExist) {
            throw new BadRequestError("'idApplication' inválido")
        }


        const jobOpportunityCreator = await this.jobOpportunity.getByCompanyId(payload.id)

        if (!jobOpportunityCreator && payload.role === USER_ROLES.NORMAL) {
            throw new BadRequestError("Não possui vagas cadastradas nesse Id")
        }

        if (payload.role !== USER_ROLES.ADMIN && payload.id !== jobOpportunityCreator.company_id) {
            throw new BadRequestError("Só o criador pode aceitar ou aceitar")
        }

        const novoStatus = APPLICATION_STATUS.APROVADO
        const updatedAt = new Date().toISOString()

        const jobApplication = new JobApplication(
            jobApplicationExist.id,
            jobApplicationExist.job_opportunity_id,
            jobApplicationExist.user_id,
            novoStatus,
            updatedAt
        )

        const jobApplicationDB = jobApplication.toDBModel()

        await this.jobApplicationDatabase.update(idApplication, jobApplicationDB)

    }

    public denyApplication = async (input: dennyApplicationInputDTO): Promise<void> => {
        const { token, idApplication } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof idApplication !== "string") {
            throw new BadRequestError("'idApplication' deve ser string")
        }


        const jobApplicationExist = await this.jobApplicationDatabase.getById(idApplication)

        if (!jobApplicationExist) {
            throw new BadRequestError("'idApplication' inválido")
        }


        const jobOpportunityCreator = await this.jobOpportunity.getByCompanyId(payload.id)

        if (!jobOpportunityCreator && payload.role === USER_ROLES.NORMAL) {
            throw new BadRequestError("Não possui vagas cadastradas nesse Id")
        }

        if (payload.role !== USER_ROLES.ADMIN && payload.id !== jobOpportunityCreator.company_id) {
            throw new BadRequestError("Só o criador pode aceitar ou recusar")
        }

        const novoStatus = APPLICATION_STATUS.RECUSADO
        const updatedAt = new Date().toISOString()

        const jobApplication = new JobApplication(
            jobApplicationExist.id,
            jobApplicationExist.job_opportunity_id,
            jobApplicationExist.user_id,
            novoStatus,
            updatedAt
        )

        const jobApplicationDB = jobApplication.toDBModel()

        await this.jobApplicationDatabase.update(idApplication, jobApplicationDB)

    }

    public deletejobApplication = async (input: deleteJobApplicationInputDTO): Promise<void> => {
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

        const jobApplicationExist = await this.jobApplicationDatabase.getById(idToDelete)

        if (!jobApplicationExist) {
            throw new BadRequestError("'id' inválido")
        }

        if (payload.role !== USER_ROLES.ADMIN && jobApplicationExist.user_id !== payload.id) {
            throw new BadRequestError("Sómente o quem se inscreveu pode deletar")
        }

        await this.jobApplicationDatabase.delete(idToDelete)

    }

    public getJobApplicationbyUserId = async (input:getJobApplicationInputDTO):Promise<getJobApplicationOutputDTO>=>{
        const {token} = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const userId = payload.id

        const jobApplicationsDB: JobApplicationDB[] = await this.jobApplicationDatabase.getByUserID(userId)
        
        const jobApplicationsModel = jobApplicationsDB.map((jobApplicationDB)=>{
            const jobApplication = new JobApplication(
                jobApplicationDB.id,
                jobApplicationDB.job_opportunity_id,
                jobApplicationDB.user_id,
                jobApplicationDB.status,
                jobApplicationDB.created_at
            )
            return jobApplication.toBusinessModel()
        })

        return jobApplicationsModel      

    }
}