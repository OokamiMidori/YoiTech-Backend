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
exports.MoveDisponibilityBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const TokenManager_1 = require("../services/TokenManager");
const moveDisponibility_1 = require("../models/moveDisponibility");
class MoveDisponibilityBusiness {
    constructor(moveDisponibilityDataBase, tokenManager) {
        this.moveDisponibilityDataBase = moveDisponibilityDataBase;
        this.tokenManager = tokenManager;
        this.createMoveDisponibility = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, availabilityTOMove, needHousing, needTransportationToMove, pet, petType } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const userId = payload.id;
            const availabilityToMoveExist = yield this.moveDisponibilityDataBase.findById(userId);
            if (availabilityToMoveExist) {
                throw new BadRequestError_1.BadRequestError("Item já existe");
            }
            if (typeof availabilityTOMove !== "number") {
                throw new BadRequestError_1.BadRequestError("'availabilityToMove' deve ser string");
            }
            if (typeof needHousing !== "number") {
                throw new BadRequestError_1.BadRequestError("'needHousing' deve ser number");
            }
            if (typeof needTransportationToMove !== "number") {
                throw new BadRequestError_1.BadRequestError("'needTransportationToMove' deve ser number");
            }
            if (typeof pet !== "number") {
                throw new BadRequestError_1.BadRequestError("'pet' deve ser number");
            }
            if (typeof petType !== "string") {
                throw new BadRequestError_1.BadRequestError("'petType' deve ser string");
            }
            const createdAt = new Date().toISOString();
            const moveDisponibility = new moveDisponibility_1.MoveDisponibility(userId, availabilityTOMove, needHousing, needTransportationToMove, createdAt, pet, petType);
            const moveDisponibilityDB = moveDisponibility.toDBModel();
            yield this.moveDisponibilityDataBase.insert(moveDisponibilityDB);
        });
        this.getMoveDisponibility = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, userId } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const moveDisponibilityDB = yield this.moveDisponibilityDataBase.findById(userId);
            const moveDisponibility = new moveDisponibility_1.MoveDisponibility(moveDisponibilityDB.user_id, moveDisponibilityDB.availability_to_move, moveDisponibilityDB.need_housing, moveDisponibilityDB.need_transportation_to_move, moveDisponibilityDB.created_at, moveDisponibilityDB.pet, moveDisponibilityDB.pet_type);
            const moveDisponibilityBusiness = moveDisponibility.toBusinessModel();
            return moveDisponibilityBusiness;
        });
        this.deleteMoveDisponibility = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idToDelete } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const moveDisponibilityDB = yield this.moveDisponibilityDataBase.findById(idToDelete);
            if (!moveDisponibilityDB) {
                throw new BadRequestError_1.BadRequestError("Item não existe");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN && payload.id !== idToDelete) {
                throw new BadRequestError_1.BadRequestError("Somente criou o item pode deleta-lo");
            }
            yield this.moveDisponibilityDataBase.delete(idToDelete);
        });
        this.editMoveDisponibility = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, availabilityTOMove, needHousing, needTransportationToMove, pet, petType } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const userId = payload.id;
            const availabilityToMoveExist = yield this.moveDisponibilityDataBase.findById(userId);
            if (!availabilityToMoveExist) {
                throw new BadRequestError_1.BadRequestError("Item não existe");
            }
            if (typeof availabilityTOMove !== "number") {
                throw new BadRequestError_1.BadRequestError("'availabilityToMove' deve ser string");
            }
            if (typeof needHousing !== "number") {
                throw new BadRequestError_1.BadRequestError("'needHousing' deve ser number");
            }
            if (typeof needTransportationToMove !== "number") {
                throw new BadRequestError_1.BadRequestError("'needTransportationToMove' deve ser number");
            }
            if (typeof pet !== "number") {
                throw new BadRequestError_1.BadRequestError("'pet' deve ser number");
            }
            if (typeof petType !== "string") {
                throw new BadRequestError_1.BadRequestError("'petType' deve ser string");
            }
            const moveDisponibility = new moveDisponibility_1.MoveDisponibility(userId, availabilityTOMove, needHousing, needTransportationToMove, availabilityToMoveExist.created_at, pet, petType);
            const moveDisponibilityDB = moveDisponibility.toDBModel();
            yield this.moveDisponibilityDataBase.update(userId, moveDisponibilityDB);
        });
    }
}
exports.MoveDisponibilityBusiness = MoveDisponibilityBusiness;
