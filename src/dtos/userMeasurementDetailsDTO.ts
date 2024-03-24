import { UserMeasurementDetailsModel } from "../Types"

export interface createUserMeasurementDetailsInputDTO{
    token:string|undefined,
    height:string,
    weight:string,
    uniformShirt:string,
    uniformPants:string,
    dominantHand:string,
    glasses:number,
    tatoo:string,
    piercing:number,
    smooker:number,
    medicalTreatment:number,
    typeOfTreatment:string
}

export interface editUserMeasurementDetailInputDTO{
    token:string|undefined,
    height:string,
    weight:string,
    uniformShirt:string,
    uniformPants:string,
    dominantHand:string,
    glasses:number,
    tatoo:string,
    piercing:number,
    smooker:number,
    medicalTreatment:number,
    typeOfTreatment:string
}

export interface deleteUserMeasurementDetailInputDTO{
    token:string|undefined,
    idToDelete:string
}

export type getUserMeasurementDetailOutputDTO = UserMeasurementDetailsModel

export interface getUserMeasurementDetailInputDTO {
    token:string|undefined
}