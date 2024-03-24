import { JobApplicationModel } from "../Types"

export interface isertJobApplicationInputDTO {
    token: string | undefined,
    jobOpportunityId: string
}

export interface getJobApplicationInputDTO {
    token: string | undefined,
}

export type getJobApplicationOutputDTO = JobApplicationModel[]

export interface deleteJobApplicationInputDTO{
    token:string|undefined,
    idToDelete:string
}

export interface updateJobApplicationInputDTO{
    token:string|undefined,
    idToUpdate:string,
    status:string
}

export interface acceptApplicationInputDTO{
    token:string|undefined,
    idApplication:string
}

export interface dennyApplicationInputDTO{
    token:string|undefined,
    idApplication:string
}