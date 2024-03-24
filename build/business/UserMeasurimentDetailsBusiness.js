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
exports.UserMeasurimentDetailsBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const userMeasurementDetails_1 = require("../models/userMeasurementDetails");
const TokenManager_1 = require("../services/TokenManager");
class UserMeasurimentDetailsBusiness {
    constructor(userMeasurimentDatabase, tokenManager, idGenerator, hashManager) {
        this.userMeasurimentDatabase = userMeasurimentDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.createUserMeasurementDetails = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, height, weight, uniformShirt, uniformPants, dominantHand, glasses, tatoo, piercing, smooker, medicalTreatment, typeOfTreatment } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const userId = payload.id;
            const userMeasurementDetailExist = yield this.userMeasurimentDatabase.getById(userId);
            if (userMeasurementDetailExist) {
                throw new BadRequestError_1.BadRequestError("Usuário já possui detalhes de medidas");
            }
            if (typeof height !== "string") {
                throw new BadRequestError_1.BadRequestError("height deve ser string");
            }
            if (typeof weight !== "string") {
                throw new BadRequestError_1.BadRequestError("weight deve ser string");
            }
            if (typeof uniformShirt !== "string") {
                throw new BadRequestError_1.BadRequestError("uniformShirt deve ser string");
            }
            if (typeof uniformPants !== "string") {
                throw new BadRequestError_1.BadRequestError("uniformPants deve ser string");
            }
            if (typeof dominantHand !== "string") {
                throw new BadRequestError_1.BadRequestError("dominantHand deve ser string");
            }
            if (typeof glasses !== "number") {
                throw new BadRequestError_1.BadRequestError("glasses deve ser number");
            }
            if (typeof tatoo !== "string") {
                throw new BadRequestError_1.BadRequestError("tatoo deve ser string");
            }
            if (typeof piercing !== "number") {
                throw new BadRequestError_1.BadRequestError("piercing deve ser number");
            }
            if (typeof smooker !== "number") {
                throw new BadRequestError_1.BadRequestError("smooker deve ser number");
            }
            if (typeof medicalTreatment !== "string") {
                throw new BadRequestError_1.BadRequestError("medicalTreatment deve ser number");
            }
            if (typeof typeOfTreatment !== "string") {
                throw new BadRequestError_1.BadRequestError("typeOfTreatment deve ser string");
            }
            const createdAt = new Date().toISOString();
            const userMeasurementDetails = new userMeasurementDetails_1.UserMeasurementDetails(userId, height, weight, uniformShirt, uniformPants, dominantHand, glasses, tatoo, piercing, smooker, medicalTreatment, typeOfTreatment, createdAt);
            const userMeasurementDetailsDB = userMeasurementDetails.toDBModel();
            yield this.userMeasurimentDatabase.isert(userMeasurementDetailsDB);
        });
        this.getUserMeasurementDetails = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const idToGet = payload.id;
            const userMeasurementDetailDB = yield this.userMeasurimentDatabase.getById(idToGet);
            const userMeasurementDetails = new userMeasurementDetails_1.UserMeasurementDetails(userMeasurementDetailDB.user_id, userMeasurementDetailDB.height, userMeasurementDetailDB.weight, userMeasurementDetailDB.uniform_shirt, userMeasurementDetailDB.uniform_pants, userMeasurementDetailDB.dominant_hand, userMeasurementDetailDB.glasses, userMeasurementDetailDB.tatoo, userMeasurementDetailDB.piercing, userMeasurementDetailDB.smooker, userMeasurementDetailDB.medical_treatment, userMeasurementDetailDB.type_of_treatment, userMeasurementDetailDB.created_at);
            const userMeasurementDetailsModel = userMeasurementDetails.toBusinessModel();
            return userMeasurementDetailsModel;
        });
        this.editUserMeasurementDetails = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, height, weight, uniformShirt, uniformPants, dominantHand, glasses, tatoo, piercing, smooker, medicalTreatment, typeOfTreatment } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const userId = payload.id;
            const userMeasurementDetailExist = yield this.userMeasurimentDatabase.getById(userId);
            if (!userMeasurementDetailExist) {
                throw new BadRequestError_1.BadRequestError("Item inexistente");
            }
            if (typeof height !== "string") {
                throw new BadRequestError_1.BadRequestError("height deve ser string");
            }
            if (typeof weight !== "string") {
                throw new BadRequestError_1.BadRequestError("weight deve ser string");
            }
            if (typeof uniformShirt !== "string") {
                throw new BadRequestError_1.BadRequestError("uniformShirt deve ser string");
            }
            if (typeof uniformPants !== "string") {
                throw new BadRequestError_1.BadRequestError("uniformPants deve ser string");
            }
            if (typeof dominantHand !== "string") {
                throw new BadRequestError_1.BadRequestError("dominantHand deve ser string");
            }
            if (typeof glasses !== "number") {
                throw new BadRequestError_1.BadRequestError("glasses deve ser number");
            }
            if (typeof tatoo !== "string") {
                throw new BadRequestError_1.BadRequestError("tatoo deve ser string");
            }
            if (typeof piercing !== "number") {
                throw new BadRequestError_1.BadRequestError("piercing deve ser number");
            }
            if (typeof smooker !== "number") {
                throw new BadRequestError_1.BadRequestError("smooker deve ser number");
            }
            if (typeof medicalTreatment !== "string") {
                throw new BadRequestError_1.BadRequestError("medicalTreatment deve ser number");
            }
            if (typeof typeOfTreatment !== "string") {
                throw new BadRequestError_1.BadRequestError("typeOfTreatment deve ser string");
            }
            const createdAt = new Date().toISOString();
            const userMeasurementDetails = new userMeasurementDetails_1.UserMeasurementDetails(userId, height, weight, uniformShirt, uniformPants, dominantHand, glasses, tatoo, piercing, smooker, medicalTreatment, typeOfTreatment, createdAt);
            const userMeasurementDetailsDB = userMeasurementDetails.toDBModel();
            yield this.userMeasurimentDatabase.update(userId, userMeasurementDetailsDB);
        });
        this.deleteUserMeasurementDetail = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idToDelete } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const userId = payload.id;
            const userMeasurementDetailExist = yield this.userMeasurimentDatabase.getById(userId);
            if (!userMeasurementDetailExist) {
                throw new BadRequestError_1.BadRequestError("Item inexistente");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN && payload.id !== idToDelete) {
                throw new BadRequestError_1.BadRequestError("Somente quem criou pode deletar.");
            }
            yield this.userMeasurimentDatabase.delete(idToDelete);
        });
    }
}
exports.UserMeasurimentDetailsBusiness = UserMeasurimentDetailsBusiness;
