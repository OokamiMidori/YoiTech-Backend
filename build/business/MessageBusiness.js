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
exports.MessageBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const Message_1 = require("../models/Message");
const TokenManager_1 = require("../services/TokenManager");
class MessageBusiness {
    constructor(messageDatabase, tokenManager, idGenerator, hashManager, userDatabase, companyDatabase) {
        this.messageDatabase = messageDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.userDatabase = userDatabase;
        this.companyDatabase = companyDatabase;
        this.createMessage = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, companyId, userId, content } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof companyId !== "string") {
                throw new BadRequestError_1.BadRequestError("'companyId' deve ser string");
            }
            if (typeof userId !== "string") {
                throw new BadRequestError_1.BadRequestError("'userId' deve ser string");
            }
            if (typeof content !== "string") {
                throw new BadRequestError_1.BadRequestError("'content' deve ser string");
            }
            const user = yield this.userDatabase.findById(userId);
            if (!user) {
                throw new BadRequestError_1.BadRequestError("'userId' inválido");
            }
            const company = yield this.companyDatabase.getById(companyId);
            if (!company) {
                throw new BadRequestError_1.BadRequestError("'companyId' inválido");
            }
            const id = this.idGenerator.generate();
            const createdAt = new Date().toISOString();
            const message = new Message_1.Message(id, payload.id, companyId, userId, content, createdAt);
            const messageDB = message.toDBModel();
            yield this.messageDatabase.insert(messageDB);
        });
        this.getMessagesByCreatorId = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const idToFind = payload.id;
            const messagesDB = yield this.messageDatabase.getAllMessageByCreatorId(idToFind);
            const messages = messagesDB.map((messageDB) => {
                const message = new Message_1.Message(messageDB.id, messageDB.creator_id, messageDB.company_id, messageDB.user_id, messageDB.content, messageDB.created_at);
                return message.toBusinessModel();
            });
            return messages;
        });
        this.getMessagesByCompanyId = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, companyId } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof companyId !== "string") {
                throw new BadRequestError_1.BadRequestError("'companyId' deve ser string");
            }
            const company = yield this.companyDatabase.getById(companyId);
            if (!company) {
                throw new BadRequestError_1.BadRequestError("'companyId' inválido");
            }
            const messagesDB = yield this.messageDatabase.getAllMessageByCompanyId(companyId);
            const messages = messagesDB.map((messageDB) => {
                const message = new Message_1.Message(messageDB.id, messageDB.creator_id, messageDB.company_id, messageDB.user_id, messageDB.content, messageDB.created_at);
                return message.toBusinessModel();
            });
            return messages;
        });
        this.getMessagesByUserID = (input) => __awaiter(this, void 0, void 0, function* () {
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
            const user = yield this.userDatabase.findById(userId);
            if (!user)
                throw new BadRequestError_1.BadRequestError("'userId' inválido");
            const messagesDB = yield this.messageDatabase.getAllMessageByUserId(userId);
            const messages = messagesDB.map((messageDB) => {
                const message = new Message_1.Message(messageDB.id, messageDB.creator_id, messageDB.company_id, messageDB.user_id, messageDB.content, messageDB.created_at);
                return message.toBusinessModel();
            });
            return messages;
        });
        this.deleteMessage = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idToDelete } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof idToDelete !== "string") {
                throw new BadRequestError_1.BadRequestError("'idToDelete' deve ser string");
            }
            const messageDB = yield this.messageDatabase.getById(idToDelete);
            if (!messageDB) {
                throw new BadRequestError_1.BadRequestError("'idToDelete' inválido");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN && messageDB.creator_id !== payload.id) {
                throw new BadRequestError_1.BadRequestError(" somente o criador pode deletar o item");
            }
            yield this.messageDatabase.delete(idToDelete);
        });
    }
}
exports.MessageBusiness = MessageBusiness;
