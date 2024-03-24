import { UserAdressModel } from "../Types"

export interface userAdressInputDTO {
    token:string|undefined,
    userId:string,
    cep:string,
    stateProvince:string,
    city:string,
    neighborhood:string,
    apartment:string
}

export interface getUserAdressInputDTO{
    token:string|undefined
}

export type getUserAdressOutputDTO = UserAdressModel

export interface deletUserAdressInputDTO{
    token:string|undefined,
    idToDelet:string
}

export interface editUserAdressInputDTO{
    idToEdit:string,
    token:string|undefined,
    cep:string,
    stateProvince:string,
    city:string,
    neighborhood:string,
    apartment:string
}


