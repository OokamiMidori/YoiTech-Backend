import { MoveDisponibilityModel } from "../Types"

export interface createMoveDisponibilityInputDTO{
    token:string|undefined,
    availabilityTOMove:number,
    needHousing:number,
    needTransportationToMove:number,
    pet:number,
    petType:string
}

export interface updateMoveDisponibilityInputDTO{
    token:string|undefined,
    availabilityTOMove:number,
    needHousing:number,
    needTransportationToMove:number,
    pet:number,
    petType:string
}

export interface deleteMoveDisponibilityInputDTO{
    token:string|undefined,
    idToDelete:string
}

export interface getMoveDisponibilityInputDTO{
    token:string|undefined,
    userId:string
}

export type getMoveDIsponibilityOutputDTO = MoveDisponibilityModel
