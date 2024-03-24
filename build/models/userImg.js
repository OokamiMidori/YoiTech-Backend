"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserImg = void 0;
class UserImg {
    constructor(userId, img, createdAt) {
        this.userId = userId;
        this.img = img;
        this.createdAt = createdAt;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
    getImg() {
        return this.img;
    }
    setImg(value) {
        this.img = value;
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
            img: this.img,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            userId: this.userId,
            img: this.img,
            createdAt: this.createdAt
        };
    }
}
exports.UserImg = UserImg;
