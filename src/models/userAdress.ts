import { UserAdressDB, UserAdressModel } from "../Types"

export class UserAdress {
    constructor(
        private userId: string,
        private id: string,
        private cep: string,
        private stateProvince: string,
        private city: string,
        private neighborhood: string,
        private apartment: string,
        private createdAt: string
    ) { }

    public getUserId(): string {
        return this.userId
    }

    public setUserId(value: string): void {
        this.userId = value
    }

    public getCep(): string {
        return this.cep
    }

    public setCep(value: string): void {
        this.cep = value
    }

    public getStateProvince(): string {
        return this.stateProvince
    }

    public setStateProvince(value: string): void {
        this.stateProvince = value
    }

    public getCity(): string {
        return this.city
    }

    public setCity(value: string): void {
        this.city = value
    }

    public getNeighborhood(): string {
        return this.neighborhood
    }

    public setNeighborhood(value: string): void {
        this.neighborhood = value
    }

    public getApartment(): string {
        return this.apartment
    }

    public setApartment(value: string): void {
        this.apartment = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public toDBModel(): UserAdressDB {
        return {
            user_id: this.userId,
            id: this.id,
            cep: this.cep,
            state_province: this.stateProvince,
            city: this.city,
            neighborhood: this.neighborhood,
            apartment: this.apartment,
            created_at: this.createdAt
        }
    }

    public toBusinessModel(): UserAdressModel {
        return {
            userId: this.userId,
            id: this.id,
            cep: this.cep,
            stateProvince: this.stateProvince,
            city: this.city,
            neighborhood: this.neighborhood,
            apartment: this.apartment,
            createdAt: this.createdAt
        }
    }
}