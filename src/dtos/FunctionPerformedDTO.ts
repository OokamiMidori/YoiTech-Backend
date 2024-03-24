import { FunctionPerformedModel } from "../Types"

export interface FunctionPerformedInputDTO{
    token:string|undefined,
    lineOfBusinessId:string,
    content:string
}

export interface getFunctionPerformedInputDTO{
    token:string|undefined
}

export type getFunctionPerformedOutputDTO = FunctionPerformedModel[]

export interface deleteFunctionPerformedInputDTO{
    token:string|undefined,
    id:string
}

export interface editFunctionPerformedInputDTO{
    idToEdit:string,
    token:string|undefined,
    content:string
}