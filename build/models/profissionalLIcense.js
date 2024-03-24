"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfissionalLicense = void 0;
class ProfissionalLicense {
    constructor(id, content, createdAt) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getContent() {
        return this.content;
    }
    setContent(value) {
        this.content = value;
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
            content: this.content,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            content: this.content,
            createdAt: this.createdAt
        };
    }
}
exports.ProfissionalLicense = ProfissionalLicense;
