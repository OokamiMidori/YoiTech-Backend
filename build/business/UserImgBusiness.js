"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserImgBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const userImg_1 = require("../models/userImg");
const TokenManager_1 = require("../services/TokenManager");
class UserImgBusiness {
    constructor(userImgDatabase, tokenManager) {
        this.userImgDatabase = userImgDatabase;
        this.tokenManager = tokenManager;
        this.createUserImg = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, img } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof img !== "string") {
                throw new BadRequestError_1.BadRequestError("'img' deve ser string");
            }
            const userId = payload.id;
            const userImgExist = yield this.userImgDatabase.findById(userId);
            if (userImgExist) {
                throw new BadRequestError_1.BadRequestError("Usuário possui imagem cadastrada");
            }
            const createdAt = new Date().toISOString();
            const userImg = new userImg_1.UserImg(userId, img, createdAt);
            const userImgDB = userImg.toDBModel();
            yield this.userImgDatabase.insert(userImgDB);
        });
        this.getUserImg = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, userId } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof userId !== "string") {
                throw new BadRequestError_1.BadRequestError("'userId' deve ser string");
            }
            const userImgDB = yield this.userImgDatabase.findById(userId);
            if (!userImgDB) {
                throw new BadRequestError_1.BadRequestError("Imagem não existente");
            }
            const userImg = new userImg_1.UserImg(userImgDB.user_id, userImgDB.img, userImgDB.created_at);
            const userImgBusiness = userImg.toBusinessModel();
            return userImgBusiness;
        });
        this.deleteUserImg = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idToDelete } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const userImgDB = yield this.userImgDatabase.findById(idToDelete);
            if (!userImgDB) {
                throw new BadRequestError_1.BadRequestError("Imagem não existente");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN && payload.id !== idToDelete) {
                throw new BadRequestError_1.BadRequestError("Somente o usuário que criou pode deletar");
            }
            yield this.userImgDatabase.delete(idToDelete);
        });
        this.updateUserImg = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idToUpdate, img } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const userImgDB = yield this.userImgDatabase.findById(idToUpdate);
            if (!userImgDB) {
                throw new BadRequestError_1.BadRequestError("Imagem não existente");
            }
            if (typeof img !== "string") {
                throw new BadRequestError_1.BadRequestError("'img' deve ser string");
            }
            const userImg = new userImg_1.UserImg(userImgDB.user_id, img, userImgDB.created_at);
            const userImgToDB = userImg.toDBModel();
            yield this.userImgDatabase.update(idToUpdate, userImgToDB);
        });
    }
}
exports.UserImgBusiness = UserImgBusiness;
