"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingCompany = void 0;
class RatingCompany {
    constructor(id, applicationId, rating, message, createdAt) {
        this.id = id;
        this.applicationId = applicationId;
        this.rating = rating;
        this.message = message;
        this.createdAt = createdAt;
    }
    toDBModel() {
        return {
            id: this.id,
            application_id: this.applicationId,
            rating: this.rating,
            message: this.message,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            applicationId: this.applicationId,
            rating: this.rating,
            message: this.message,
            createdAt: this.createdAt
        };
    }
}
exports.RatingCompany = RatingCompany;
