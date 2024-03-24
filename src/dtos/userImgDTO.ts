import { UserImgModel } from "../Types"

export interface insertUserImgInputDTO{
    token:string|undefined,
    img:string
}

export interface getUserImgInputDTO{
    token:string|undefined,
    userId:string
}

export type getUserImgOutputDTO = UserImgModel

export interface deleteUserImgInputDTO {
    token:string|undefined,
    idToDelete:string
}

export interface updateUserImgInputDTO{
    token:string|undefined,
    idToUpdate:string,
    img:string
}