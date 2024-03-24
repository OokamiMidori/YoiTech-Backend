import { JobOpportunityModel } from "../Types"

export interface insertJobOpportunityInputDTO{
    token:string|undefined,
    functionPerformedId: string,
    city: string,
    cep:string,
    stateProvince:string,
    hourlyWage: string,
    shift: string,
    overtime: string,
    minAge: number,
    maxAge: number,
    japaneseCoversationStatus: number,
    japaneseReadingStatus: number,
    driverLicense: string,
    typeDriverLicense: string,
    profissionalLicenseId: string,
    minHeight: number,
    maxHeight: number,
    minWeight: number,
    maxWeight: number,
    minUniformSize: string,
    maxUniformSize: string,
    glass: string,
    tatoo: string,
    pircing: string,
    smooker: string,
    dominantHand: string,
    detailsJobOppotunity: string   
}

export interface deleteJobOpportunityInputDTO{
    token:string|undefined,
    idToDelete:string
}

export interface updateJobOpportunityInputDTO{
    token:string|undefined,
    idToUpdate:string,
    functionPerformedId: string,
    city: string,
    cep:string,
    stateProvince:string
    hourlyWage: string,
    shift: string,
    overtime: string,
    minAge: number,
    maxAge: number,
    japaneseCoversationStatus: number,
    japaneseReadingStatus: number,
    driverLicense: string,
    typeDriverLicense: string,
    profissionalLicenseId: string,
    minHeight: number,
    maxHeight: number,
    minWeight: number,
    maxWeight: number,
    minUniformSize: string,
    maxUniformSize: string,
    glass: string,
    tatoo: string,
    pircing: string,
    smooker: string,
    dominantHand: string,
    detailsJobOppotunity: string,
    evaluation: number
}

export interface getAllJobOpportunityInputDTO{
    token:string|undefined
}

export type getAllJobOpportunityOutputDTO = JobOpportunityModel[]