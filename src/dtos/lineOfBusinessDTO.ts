import { LineOfBusinessModel } from "../Types"

export interface LineOfBusinessInputDTO {
    token:string|undefined,
    content:unknown
}

export interface GetLineOfBusinessInputDTO {
    token:string|undefined
}

export type GetLineOfBusinessOutputDTO = LineOfBusinessModel[]

export interface deleteLineOfBusinessInputDTO {
    token:string|undefined,
    id:string
}

export interface EditLineOfBusinessInputDTO {
    idToEdit:string,
    token: string|undefined,
    content:string
}