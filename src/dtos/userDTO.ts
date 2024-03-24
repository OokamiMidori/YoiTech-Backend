import { UserModel } from "../Types"

export interface SignupInputDTO {
    name: unknown,
    email: unknown,
    password: unknown,
    phoneNumber:unknown,
    birthDate:unknown,
    gender:unknown,
    nationality:unknown,
    maritalStatus:unknown,
 
}

export interface SignupOutputDTO {
    token: string
}

export interface LoginInputDTO {
    email: unknown,
    password: unknown
}

export interface LoginOutputDTO {
    token: string
}

export interface ActivationEmailInputDTO {
    email:string
    token:string|undefined
    confirmation:unknown
}

export interface getUserInputDTO{
    token:string|undefined,
    idToGet:string
}

export type getUserOutputDTO = UserModel