"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveDisponibility = void 0;
class MoveDisponibility {
    constructor(userId, avaibilityToMove, needHousing, needTransportationToMove, createdAt, pet, petType) {
        this.userId = userId;
        this.avaibilityToMove = avaibilityToMove;
        this.needHousing = needHousing;
        this.needTransportationToMove = needTransportationToMove;
        this.createdAt = createdAt;
        this.pet = pet;
        this.petType = petType;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
    getAvaibilityToMove() {
        return this.avaibilityToMove;
    }
    setAvaibilityToMove(value) {
        this.avaibilityToMove = value;
    }
    getNeedHousing() {
        return this.needHousing;
    }
    setNeedHousing(value) {
        this.needHousing = value;
    }
    getNeedTransportationToMove() {
        return this.needTransportationToMove;
    }
    setNeedTransportationToMove(value) {
        this.needTransportationToMove = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    getPet() {
        return this.pet;
    }
    setPet(value) {
        this.pet = value;
    }
    getPetType() {
        return this.petType;
    }
    setPetType(value) {
        this.petType = value;
    }
    toDBModel() {
        return {
            user_id: this.userId,
            availability_to_move: this.avaibilityToMove,
            need_housing: this.needHousing,
            need_transportation_to_move: this.needTransportationToMove,
            created_at: this.createdAt,
            pet: this.pet,
            pet_type: this.petType
        };
    }
    toBusinessModel() {
        return {
            userId: this.userId,
            availabilityToMove: this.avaibilityToMove,
            needHousing: this.needHousing,
            needTransportationToMove: this.needTransportationToMove,
            createdAt: this.createdAt,
            pet: this.pet,
            petType: this.petType
        };
    }
}
exports.MoveDisponibility = MoveDisponibility;
