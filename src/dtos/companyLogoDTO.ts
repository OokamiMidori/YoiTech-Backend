import { CompanyLogoModel } from "../Types"

export interface insertCompanyLogoInputDTO{
    token:string|undefined,
    logo:string
}

export interface getCompanyLogoInputDTO{
    token:string|undefined,
    companyId:string
}

export type getCompanyLogoOutputDTO = CompanyLogoModel

export interface deleteCompanyLogoInputDTO {
    token:string|undefined,
    idToDelete:string
}

export interface updateCompanyLogoInputDTO{
    token:string|undefined,
    idToUpdate:string,
    logo:string
}