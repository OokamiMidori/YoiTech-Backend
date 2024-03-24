import { ProfissionalLicenseModel } from "../Types"

export interface ProfissionalLicenseInputDTO{
    token:string|undefined,
    content:string
}

export interface getProfissionalLicenseInputDTO{
    token:string|undefined
}

export type getProfissionalLicenseOutputDTO = ProfissionalLicenseModel[]

export interface deleteProfissionalLicenseInputDTO{
    token:string|undefined,
    idToDelete:string
}

export interface editProfissionalLicenseInputDTO{
    idToEdit:string,
    token:string|undefined,
    content:any
}