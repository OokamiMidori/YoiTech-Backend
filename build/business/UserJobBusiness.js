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
exports.UserJobBusiness = void 0;
const Types_1 = require("../Types");
const BadRequestError_1 = require("../errors/BadRequestError");
const userJob_1 = require("../models/userJob");
class UserJobBusiness {
    constructor(userJobDatabase, tokenManager) {
        this.userJobDatabase = userJobDatabase;
        this.tokenManager = tokenManager;
        this.createUserJob = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, workingStatus, salaryClaim, startUpForecast, overtimeAvailability } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof workingStatus !== "string") {
                throw new BadRequestError_1.BadRequestError("'workingStatus' deve ser string");
            }
            if (typeof salaryClaim !== "string") {
                throw new BadRequestError_1.BadRequestError("'salaryClaim' deve ser string");
            }
            if (typeof startUpForecast !== "string") {
                throw new BadRequestError_1.BadRequestError("'startUpForecast' deve ser string");
            }
            if (typeof overtimeAvailability !== "string") {
                throw new BadRequestError_1.BadRequestError("'overtimeAvailabiliti' deve ser string");
            }
            const userJobExistente = yield this.userJobDatabase.findById(payload.id);
            if (userJobExistente) {
                throw new BadRequestError_1.BadRequestError("'User Job' existente");
            }
            const userJob = new userJob_1.UserJob(payload.id, workingStatus, salaryClaim, startUpForecast, overtimeAvailability);
            const userJobDB = userJob.toDBModel();
            yield this.userJobDatabase.insert(userJobDB);
        });
        this.getUserJob = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const userJobDB = yield this.userJobDatabase.findById(payload.id);
            if (!userJobDB) {
                throw new BadRequestError_1.BadRequestError("User Job não cadastrado.");
            }
            const userJob = new userJob_1.UserJob(userJobDB.user_id, userJobDB.working_status, userJobDB.salary_claim, userJobDB.start_up_forecast, userJobDB.overtime_availability);
            const userJobBusiness = userJob.toBusinessModel();
            return userJobBusiness;
        });
        this.deleteUserJob = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idToDelete } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const userJobDB = yield this.userJobDatabase.findById(payload.id);
            if (!userJobDB) {
                throw new BadRequestError_1.BadRequestError("User Job não cadastrado.");
            }
            if (typeof idToDelete !== "string") {
                throw new BadRequestError_1.BadRequestError("'idToDelete' deve ser string.");
            }
            if (payload.role !== Types_1.USER_ROLES.ADMIN && payload.id !== idToDelete) {
                throw new BadRequestError_1.BadRequestError("Somente o usuário que criou ou um usuário ADM pode editar esse item");
            }
            yield this.userJobDatabase.delete(idToDelete);
        });
        this.editUserJob = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, workingStatus, salaryClaim, startUpForecast, overtimeAvailability } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof workingStatus !== "string") {
                throw new BadRequestError_1.BadRequestError("'workingStatus' deve ser string");
            }
            if (typeof salaryClaim !== "string") {
                throw new BadRequestError_1.BadRequestError("'salaryClaim' deve ser string");
            }
            if (typeof startUpForecast !== "string") {
                throw new BadRequestError_1.BadRequestError("'startUpForecast' deve ser string");
            }
            if (typeof overtimeAvailability !== "string") {
                throw new BadRequestError_1.BadRequestError("'overtimeAvailabiliti' deve ser string");
            }
            const userJobExistente = yield this.userJobDatabase.findById(payload.id);
            if (!userJobExistente) {
                throw new BadRequestError_1.BadRequestError("'User Job' não existente");
            }
            const id = payload.id;
            const userJob = new userJob_1.UserJob(id, workingStatus, salaryClaim, startUpForecast, overtimeAvailability);
            const userJobDB = userJob.toDBModel();
            yield this.userJobDatabase.update(id, userJobDB);
        });
    }
}
exports.UserJobBusiness = UserJobBusiness;
