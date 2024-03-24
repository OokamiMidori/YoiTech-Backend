import { MessageModel } from "../Types"

export interface insertMessageInputDTO{
    token:string|undefined,
    companyId:string,
    userId:string,
    content:string
}

export interface deleteMessageInputDTO{
    token:string|undefined,
    idToDelete:string
}

export interface getAllMessagesByUserIdInputDTO{
    token:string|undefined,
    userId:string
}

export type getAllMessagesByUserIdOutputDTO = MessageModel[]

export interface getAllMessagesByCompanyIdInputDTO {
    token:string|undefined,
    companyId:string
}

export type getAllMessagesByCompanyIdOutputDTO = MessageModel[]

export interface getAllMessagesByCreatorIdInputDTO{
    token:string|undefined
}

export type getAllMessagesByCreatorIdOutputDTO = MessageModel[]

