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
exports.UserAdressBusiness = void 0;
const TokenManager_1 = require("../services/TokenManager");
const BadRequestError_1 = require("../errors/BadRequestError");
const userAdress_1 = require("../models/userAdress");
class UserAdressBusiness {
    constructor(userAdressDatabase, tokenManager, idGenerator, hashManager) {
        this.userAdressDatabase = userAdressDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.createUserAdress = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, userId, cep, stateProvince, city, neighborhood, apartment } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (cep !== "string") {
                throw new BadRequestError_1.BadRequestError("'cep' deve ser string");
            }
            if (stateProvince !== "string") {
                throw new BadRequestError_1.BadRequestError("'stateProvince' deve ser string");
            }
            if (city !== "string") {
                throw new BadRequestError_1.BadRequestError("'city' deve ser string");
            }
            if (neighborhood !== "string") {
                throw new BadRequestError_1.BadRequestError("'neighborhood' deve ser string");
            }
            if (apartment !== "string") {
                throw new BadRequestError_1.BadRequestError("'apartment' deve ser string");
            }
            if (userId !== "string") {
                throw new BadRequestError_1.BadRequestError("'userId' deve ser string");
            }
            const id = this.idGenerator.generate();
            const createdAt = new Date().toISOString();
            const userAdressDB = yield this.userAdressDatabase.getByUserId(userId);
            if (userAdressDB) {
                throw new BadRequestError_1.BadRequestError("Endereço já cadastrado");
            }
            const newUserAdress = new userAdress_1.UserAdress(userId, id, cep, stateProvince, city, neighborhood, apartment, createdAt);
            const UserAdressDB = newUserAdress.toDBModel();
            yield this.userAdressDatabase.insert(UserAdressDB);
        });
        this.getUserAdress = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const userId = payload.id;
            const userAdressDB = yield this.userAdressDatabase.getByUserId(userId);
            const userAdressBusiness = new userAdress_1.UserAdress(userAdressDB.user_id, userAdressDB.id, userAdressDB.cep, userAdressDB.state_province, userAdressDB.city, userAdressDB.neighborhood, userAdressDB.apartment, userAdressDB.created_at);
            const result = userAdressBusiness.toBusinessModel();
            return result;
        });
        this.deleteUserAdress = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idToDelet } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof idToDelet !== "string") {
                throw new BadRequestError_1.BadRequestError("'idToDelet' deve ser string");
            }
            const userAdressDB = yield this.userAdressDatabase.getById(idToDelet);
            if (!userAdressDB) {
                throw new BadRequestError_1.BadRequestError("'idToDelet' inválido");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN && payload.id !== userAdressDB.user_id) {
                throw new BadRequestError_1.BadRequestError("Só quem criou pode deletar");
            }
            yield this.userAdressDatabase.delete(idToDelet);
        });
        this.updateUserAdress = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, cep, stateProvince, city, neighborhood, apartment, idToEdit } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof idToEdit !== "string") {
                throw new BadRequestError_1.BadRequestError("'idToEdit' deve ser string");
            }
            if (cep !== "string") {
                throw new BadRequestError_1.BadRequestError("'cep' deve ser string");
            }
            if (stateProvince !== "string") {
                throw new BadRequestError_1.BadRequestError("'stateProvince' deve ser string");
            }
            if (city !== "string") {
                throw new BadRequestError_1.BadRequestError("'city' deve ser string");
            }
            if (neighborhood !== "string") {
                throw new BadRequestError_1.BadRequestError("'neighborhood' deve ser string");
            }
            if (apartment !== "string") {
                throw new BadRequestError_1.BadRequestError("'apartment' deve ser string");
            }
            const userDBExist = yield this.userAdressDatabase.getById(idToEdit);
            if (!userDBExist) {
                throw new BadRequestError_1.BadRequestError("idToEdit inválido");
            }
            const createdAt = new Date().toISOString();
            const userAdress = new userAdress_1.UserAdress(userDBExist.user_id, userDBExist.id, cep, stateProvince, city, neighborhood, apartment, createdAt);
            const userAdressDB = userAdress.toDBModel();
            yield this.userAdressDatabase.update(idToEdit, userAdressDB);
        });
    }
}
exports.UserAdressBusiness = UserAdressBusiness;
