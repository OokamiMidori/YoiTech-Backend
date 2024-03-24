import { RatingCompanyModel } from "../Types"

export interface createCompanyRatingInputDTO{
    token:string|undefined,
    applicationId:string,
    rating:number,
    message:string
}

export interface deleteCompanyRatingInputDTO{
    token:string|undefined,
    idToDelete:string
}

export interface getRatingByCompanyIdInputDTO{
    token:string|undefined
}

export type getRatingByCompanyIdOutputDTO = RatingCompanyModel[]

