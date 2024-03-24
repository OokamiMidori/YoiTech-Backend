import { SiteRatingModel } from "../Types"

export interface createSiteRatingInputDTO {
    token:string|undefined,
    companyId:string,
    rating:number,
    message:string
}

export interface getSiteRatingInputDTO{
    token:string|undefined
}

export type getSiteRatingOutputDTO = SiteRatingModel[]

export interface deleteSiteRatingInputDTO{
    token:  string|undefined,
    idToDelete:string
}