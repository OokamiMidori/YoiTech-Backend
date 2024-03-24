"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdress = void 0;
class UserAdress {
    constructor(userId, id, cep, stateProvince, city, neighborhood, apartment, createdAt) {
        this.userId = userId;
        this.id = id;
        this.cep = cep;
        this.stateProvince = stateProvince;
        this.city = city;
        this.neighborhood = neighborhood;
        this.apartment = apartment;
        this.createdAt = createdAt;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
    getCep() {
        return this.cep;
    }
    setCep(value) {
        this.cep = value;
    }
    getStateProvince() {
        return this.stateProvince;
    }
    setStateProvince(value) {
        this.stateProvince = value;
    }
    getCity() {
        return this.city;
    }
    setCity(value) {
        this.city = value;
    }
    getNeighborhood() {
        return this.neighborhood;
    }
    setNeighborhood(value) {
        this.neighborhood = value;
    }
    getApartment() {
        return this.apartment;
    }
    setApartment(value) {
        this.apartment = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    toDBModel() {
        return {
            user_id: this.userId,
            id: this.id,
            cep: this.cep,
            state_province: this.stateProvince,
            city: this.city,
            neighborhood: this.neighborhood,
            apartment: this.apartment,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            userId: this.userId,
            id: this.id,
            cep: this.cep,
            stateProvince: this.stateProvince,
            city: this.city,
            neighborhood: this.neighborhood,
            apartment: this.apartment,
            createdAt: this.createdAt
        };
    }
}
exports.UserAdress = UserAdress;
