"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionPerformed = void 0;
class FunctionPerformed {
    constructor(id, lineOfBusinessId, content, createdAt) {
        this.id = id;
        this.lineOfBusinessId = lineOfBusinessId;
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
    getLineOfBusinessId() {
        return this.lineOfBusinessId;
    }
    setLineOfBusinessId(value) {
        this.lineOfBusinessId = value;
    }
    toDBModel() {
        return {
            id: this.id,
            line_of_business_id: this.lineOfBusinessId,
            content: this.content,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            lineOfBusines: this.lineOfBusinessId,
            content: this.content,
            createdAt: this.createdAt
        };
    }
}
exports.FunctionPerformed = FunctionPerformed;
