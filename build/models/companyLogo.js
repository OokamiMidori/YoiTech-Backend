"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyLogo = void 0;
class CompanyLogo {
    constructor(id, companyId, logoImg, createdAt) {
        this.id = id;
        this.companyId = companyId;
        this.logoImg = logoImg;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getCompanyId() {
        return this.companyId;
    }
    setCompanyId(value) {
        this.companyId = value;
    }
    getLogoImg() {
        return this.logoImg;
    }
    setLogoImg(value) {
        this.logoImg = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    toDBModel() {
        return {
            id: this.id,
            company_id: this.companyId,
            logo_img: this.logoImg,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            companyId: this.companyId,
            logoImg: this.logoImg,
            createdAt: this.createdAt
        };
    }
}
exports.CompanyLogo = CompanyLogo;
