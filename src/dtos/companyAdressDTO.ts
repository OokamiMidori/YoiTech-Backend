import { CompanyAdressModel } from "../Types"

export interface createCompanyAdressInputDTO{
    token:string|undefined,
    companyId:string,
    cep:string,
    city:string,
    neighborhood:string,
    apartment:string
}

export interface getCompanyAdressInputDTO{
    token:string|undefined,
    companyId:string
}

export interface deleteCompanyAdressInputDTO{
    token:string|undefined,
    idToDelete:string
}

export type getCompanyAdressOutputDTO = CompanyAdressModel

export interface updateCompanyAdressInputDTO{
    token:string|undefined,
    idToUpdate:string,
    companyId:string,
    cep:string,
    city:string,
    neighborhood:string,
    apartment:string
}