import { UserMeasurementDetailsDB, UserMeasurementDetailsModel } from "../Types"

export class UserMeasurementDetails {
    constructor(
        private userId: string,
        private height: string,
        private weight: string,
        private uniformShirt: string,
        private uniformPants: string,
        private dominantHand: string,
        private glasses: number,
        private tatoo: string,
        private piercing: number,
        private smooker: number,
        private medicalTreatment: number,
        private typeOfTreatment: string,
        private createdAt: string
    ) { }

    public getUserId(): string {
        return this.userId
    }

    public setUserId(value: string): void {
        this.userId = value
    }

    public getHeight(): string {
        return this.height
    }

    public setHeight(value: string): void {
        this.height = value
    }

    public getWeight(): string {
        return this.weight
    }

    public setWeight(value: string): void {
        this.weight = value
    }

    public getUniformShirt(): string {
        return this.uniformShirt
    }

    public setUniformShirt(value: string): void {
        this.uniformShirt = value
    }

    public getUniformPants(): string {
        return this.uniformPants
    }

    public setUniformPants(value: string): void {
        this.uniformPants = value
    }

    public getDominantHand(): string {
        return this.dominantHand
    }

    public setDominantHand(value: string): void {
        this.dominantHand = value
    }

    public getGlasses(): number {
        return this.glasses
    }

    public setGlasses(value: number): void {
        this.glasses = value
    }

    public getTatoo(): string {
        return this.tatoo
    }

    public setTatoo(value: string): void {
        this.tatoo = value
    }

    public getPiercing(): number {
        return this.piercing
    }

    public setPiercing(value: number): void {
        this.piercing = value
    }

    public getSmooker(): number {
        return this.smooker
    }

    public setSmooker(value: number): void {
        this.smooker = value
    }

    public getMedicalTreatment(): number {
        return this.medicalTreatment
    }

    public getTypeOfTreatment(): string {
        return this.typeOfTreatment
    }

    public setTypeOfTreatment(value: string): void {
        this.typeOfTreatment = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public toDBModel(): UserMeasurementDetailsDB {
        return {
            user_id: this.userId,
            height: this.height,
            weight: this.weight,
            uniform_shirt: this.uniformShirt,
            uniform_pants: this.uniformPants,
            dominant_hand: this.dominantHand,
            glasses: this.glasses,
            tatoo: this.tatoo,
            piercing: this.piercing,
            smooker: this.smooker,
            medical_treatment: this.medicalTreatment,
            type_of_treatment: this.typeOfTreatment,
            created_at: this.createdAt
        }
    }

    public toBusinessModel(): UserMeasurementDetailsModel {
        return {
            userId: this.userId,
            height: this.height,
            weight: this.weight,
            uniformShirt: this.uniformShirt,
            uniformPants: this.uniformPants,
            dominantHand: this.dominantHand,
            glasses: this.glasses,
            tatoo: this.tatoo,
            piercing: this.piercing,
            smooker: this.smooker,
            medicalTreatment: this.medicalTreatment,
            typeOfTreatment: this.typeOfTreatment,
            createdAt: this.createdAt
        }
    }
}