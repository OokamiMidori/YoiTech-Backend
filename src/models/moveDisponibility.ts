import { MoveDisponibilityDB, MoveDisponibilityModel } from "../Types"

export class MoveDisponibility {
    constructor(
        private userId: string,
        private avaibilityToMove: number,
        private needHousing: number,
        private needTransportationToMove: number,
        private createdAt: string,
        private pet: number,
        private petType: string
    ) { }

    public getUserId(): string {
        return this.userId
    }
    public setUserId(value: string): void {
        this.userId = value
    }
    public getAvaibilityToMove(): number {
        return this.avaibilityToMove
    }
    public setAvaibilityToMove(value: number): void {
        this.avaibilityToMove = value
    }
    public getNeedHousing(): number {
        return this.needHousing
    }
    public setNeedHousing(value: number): void {
        this.needHousing = value
    }
    public getNeedTransportationToMove(): number {
        return this.needTransportationToMove
    }
    public setNeedTransportationToMove(value: number): void {
        this.needTransportationToMove = value
    }
    public getCreatedAt(): string {
        return this.createdAt
    }
    public setCreatedAt(value: string) {
        this.createdAt = value
    }
    public getPet(): number {
        return this.pet
    }
    public setPet(value: number): void {
        this.pet = value
    }
    public getPetType(): string {
        return this.petType
    }
    public setPetType(value: string): void {
        this.petType = value
    }

    public toDBModel(): MoveDisponibilityDB{
        return{
            user_id:this.userId,
            availability_to_move:this.avaibilityToMove,
            need_housing:this.needHousing,
            need_transportation_to_move:this.needTransportationToMove,
            created_at:this.createdAt,
            pet:this.pet,
            pet_type:this.petType
        }
    }

    public toBusinessModel():MoveDisponibilityModel{
        return{
            userId:this.userId,
            availabilityToMove:this.avaibilityToMove,
            needHousing:this.needHousing,
            needTransportationToMove:this.needTransportationToMove,
            createdAt:this.createdAt,
            pet:this.pet,
            petType:this.petType
        }
    }
}