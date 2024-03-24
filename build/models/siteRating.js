"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteRating = void 0;
class SiteRating {
    constructor(id, companyId, rating, message, createdAt) {
        this.id = id;
        this.companyId = companyId;
        this.rating = rating;
        this.message = message;
        this.createdAt = createdAt;
    }
    toDBModel() {
        return {
            id: this.id,
            company_id: this.companyId,
            rating: this.rating,
            message: this.message,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            companyId: this.companyId,
            rating: this.rating,
            message: this.message,
            createdAt: this.createdAt
        };
    }
}
exports.SiteRating = SiteRating;
