import { DrivingLicenseTypeModel } from "../Types"
import { DrivingLicenseType } from "../models/drivingLicenseType"

export interface drivingLicenseTypeInputDTO{
    token:string|undefined,
    content:string
}

export interface getDrivingLicenseTypeInputDTO{
    token:string|undefined
}

export type getDrivingLicenseTypeOutputDTO = DrivingLicenseTypeModel[]

export interface deletDrivingLicenseTypeInputDTO{
    token:string|undefined,
    idToDelete:string
}

export interface editDrivingLicenseTypeInputDTO{
    token:string|undefined,
    idToEdit:string,
    content:string
}