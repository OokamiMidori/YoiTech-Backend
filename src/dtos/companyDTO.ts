import { CompanyModel } from "../Types"

export interface signupCompanyInputDTO {
    responsableCompanyName: string,
    email: unknown,
    password: unknown,
    phoneNumber: unknown,
    cellPhoneNumber: unknown
}

export interface getCompanyInputDTO {
    token: string | undefined
}

export interface loginCompanyInputDTO {
    email: unknown,
    password: string
}

export interface signupCompanyOutputDTO {
    token: string
}

export interface loginCompanyOutputDTO {
    token: string
}

export type getCompanyOutputDTO = CompanyModel

export interface deleteCompanyInputDTO {
    token: string | undefined,
    idToDelete: string
}

export interface updateCompanyInputDTO {
    token: string | undefined,
    idToUpdate: string,
    responsableCompanyName: string,
    email: unknown,
    password: unknown,
    phoneNumber: unknown,
    cellPhoneNumber: unknown
}

export interface ActivationEmailInputDTO {
    email:string
    token:string|undefined
    confirmation:unknown
}
