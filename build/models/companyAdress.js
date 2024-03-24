"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyAdress = void 0;
class CompanyAdress {
    constructor(id, companyId, cep, city, neighborhood, apartment, createdAt) {
        this.id = id;
        this.companyId = companyId;
        this.cep = cep;
        this.city = city;
        this.neighborhood = neighborhood;
        this.apartment = apartment;
        this.createdAt = createdAt;
    }
    toDBModel() {
        return {
            id: this.id,
            company_id: this.companyId,
            cep: this.cep,
            city: this.city,
            neighborhood: this.neighborhood,
            apartment: this.apartment,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            companyId: this.companyId,
            cep: this.cep,
            city: this.city,
            neighborhood: this.neighborhood,
            apartment: this.apartment,
            createdAt: this.createdAt
        };
    }
}
exports.CompanyAdress = CompanyAdress;
