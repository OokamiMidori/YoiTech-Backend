import { WorkHistoryModel } from "../Types"

export interface createWorkHistoryInputDTO{
    token:string|undefined,
    companyName:string,
    factoryName: string,
    stateProvince: string,
    lineOfBusiness: string,
    startTime: string,
    endTime: string,
    functionPerformedId: string,
    reasonTermination: string
}

export interface deleteWorkHistoryInputDTO{
    token:string|undefined,
    idToDelete:string
}

export interface updateWorkHistoryInputDTO{
    token:string|undefined,
    idToUpdate:string,
    companyName:string,
    factoryName: string,
    stateProvince: string,
    lineOfBusiness: string,
    startTime: string,
    endTime: string,
    functionPerformedId: string,
    reasonTermination: string
}

export interface getWorkHistoryInputDTO{
    token:string|undefined,
    idToFind:string
}

export type getWorkHistoryOutputDTO = WorkHistoryModel[]