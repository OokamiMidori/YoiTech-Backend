"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    constructor(id, creatorId, companyId, userId, content, createdAt) {
        this.id = id;
        this.creatorId = creatorId;
        this.companyId = companyId;
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getCreatorId() {
        return this.creatorId;
    }
    setCreatorId(value) {
        this.creatorId = value;
    }
    getCompanyId() {
        return this.companyId;
    }
    setCompanyId(value) {
        this.companyId = value;
    }
    getuserId() {
        return this.userId;
    }
    setuserId(value) {
        this.userId = value;
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
            creator_id: this.creatorId,
            company_id: this.companyId,
            user_id: this.userId,
            content: this.content,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            creatorId: this.creatorId,
            companyId: this.companyId,
            userId: this.userId,
            content: this.content,
            createdAt: this.createdAt
        };
    }
}
exports.Message = Message;
