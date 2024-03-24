import { number } from "zod";
import { MoveDisponibilityDatabase } from "../dataBase/MoveDisponibilityDataBase";
import { createMoveDisponibilityInputDTO, deleteMoveDisponibilityInputDTO, getMoveDIsponibilityOutputDTO, getMoveDisponibilityInputDTO, updateMoveDisponibilityInputDTO } from "../dtos/moveDisponibilityDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { TokenManager, USER_ROLES } from "../services/TokenManager";
import { MoveDisponibility } from "../models/moveDisponibility";

export class MoveDisponibilityBusiness {
    constructor(
        private moveDisponibilityDataBase: MoveDisponibilityDatabase,
        private tokenManager: TokenManager
    ){}

    public createMoveDisponibility = async (input:createMoveDisponibilityInputDTO):Promise<void>=>{
        const {token, availabilityTOMove, needHousing, needTransportationToMove,pet,petType} = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const userId = payload.id

        const availabilityToMoveExist = await this.moveDisponibilityDataBase.findById(userId)

        if(availabilityToMoveExist){
            throw new BadRequestError("Item já existe")
        }

        if(typeof availabilityTOMove !== "number"){
            throw new BadRequestError("'availabilityToMove' deve ser string")
        }

        if(typeof needHousing !== "number" ){
            throw new BadRequestError("'needHousing' deve ser number")
        }
        if(typeof needTransportationToMove !== "number"){
            throw new BadRequestError("'needTransportationToMove' deve ser number")
        }
        if(typeof pet !=="number" ){
            throw new BadRequestError("'pet' deve ser number")
        }
        if(typeof petType !=="string" ){
            throw new BadRequestError("'petType' deve ser string")
        }

        const createdAt = new Date().toISOString()

        const moveDisponibility = new MoveDisponibility(
            userId,
            availabilityTOMove,
            needHousing,
            needTransportationToMove,
            createdAt,
            pet,
            petType
        )

        const moveDisponibilityDB = moveDisponibility.toDBModel()

        await this.moveDisponibilityDataBase.insert(moveDisponibilityDB)
    }

    public getMoveDisponibility = async (input:getMoveDisponibilityInputDTO):Promise <getMoveDIsponibilityOutputDTO>=>{
        const {token, userId} = input

        
        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const moveDisponibilityDB = await this.moveDisponibilityDataBase.findById(userId)

        const moveDisponibility = new MoveDisponibility(
            moveDisponibilityDB.user_id,
            moveDisponibilityDB.availability_to_move,
            moveDisponibilityDB.need_housing,
            moveDisponibilityDB.need_transportation_to_move,
            moveDisponibilityDB.created_at,
            moveDisponibilityDB.pet,
            moveDisponibilityDB.pet_type
        )

        const moveDisponibilityBusiness = moveDisponibility.toBusinessModel()

        return moveDisponibilityBusiness

    }

    public deleteMoveDisponibility = async (input:deleteMoveDisponibilityInputDTO):Promise<void>=>{
        const {token, idToDelete} = input
        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const moveDisponibilityDB = await this.moveDisponibilityDataBase.findById(idToDelete)

        if(!moveDisponibilityDB){
            throw new BadRequestError("Item não existe")
        }

        if(payload.role !== USER_ROLES.ADMIN && payload.id !== idToDelete){
            throw new BadRequestError("Somente criou o item pode deleta-lo")
        }

        await this.moveDisponibilityDataBase.delete(idToDelete)

    }

    public editMoveDisponibility = async(input:updateMoveDisponibilityInputDTO):Promise<void>=>{
        const {token, availabilityTOMove, needHousing, needTransportationToMove,pet,petType} = input

        
        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const userId = payload.id

        const availabilityToMoveExist = await this.moveDisponibilityDataBase.findById(userId)

        if(!availabilityToMoveExist){
            throw new BadRequestError("Item não existe")
        }

        if(typeof availabilityTOMove !== "number"){
            throw new BadRequestError("'availabilityToMove' deve ser string")
        }

        if(typeof needHousing !== "number" ){
            throw new BadRequestError("'needHousing' deve ser number")
        }
        if(typeof needTransportationToMove !== "number"){
            throw new BadRequestError("'needTransportationToMove' deve ser number")
        }
        if(typeof pet !=="number" ){
            throw new BadRequestError("'pet' deve ser number")
        }
        if(typeof petType !=="string" ){
            throw new BadRequestError("'petType' deve ser string")
        }

        const moveDisponibility = new MoveDisponibility(
            userId,
            availabilityTOMove,
            needHousing,
            needTransportationToMove,
            availabilityToMoveExist.created_at,
            pet,
            petType
        )

        const moveDisponibilityDB = moveDisponibility.toDBModel()

        await this.moveDisponibilityDataBase.update(userId,moveDisponibilityDB)
    }
}