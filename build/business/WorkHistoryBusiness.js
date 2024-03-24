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
exports.WorkHistoryBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const workHistory_1 = require("../models/workHistory");
const TokenManager_1 = require("../services/TokenManager");
class WorkHistoryBusiness {
    constructor(workHistoryDatabase, tokenManager, idGenerator) {
        this.workHistoryDatabase = workHistoryDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.createWorkHistory = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, companyName, factoryName, stateProvince, lineOfBusiness, startTime, endTime, functionPerformedId, reasonTermination } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof companyName !== "string") {
                throw new BadRequestError_1.BadRequestError("'companyName' deve ser string");
            }
            if (typeof factoryName !== "string") {
                throw new BadRequestError_1.BadRequestError("'factoryName' deve ser string");
            }
            if (typeof stateProvince !== "string") {
                throw new BadRequestError_1.BadRequestError("'stateProvince' deve ser string");
            }
            if (typeof lineOfBusiness !== "string") {
                throw new BadRequestError_1.BadRequestError("'lineOfBusiness' deve ser string");
            }
            if (typeof startTime !== "string") {
                throw new BadRequestError_1.BadRequestError("'startTime' deve ser string");
            }
            if (typeof endTime !== "string") {
                throw new BadRequestError_1.BadRequestError("'endTime' deve ser string");
            }
            if (typeof functionPerformedId !== "string") {
                throw new BadRequestError_1.BadRequestError("'functionPerformedId' deve ser string");
            }
            if (typeof reasonTermination !== "string") {
                throw new BadRequestError_1.BadRequestError("'reasonTermination' deve ser string");
            }
            const createdAt = new Date().toISOString();
            const id = this.idGenerator.generate();
            const userId = payload.id;
            const workHistory = new workHistory_1.WorkHisotry(id, userId, companyName, factoryName, stateProvince, lineOfBusiness, startTime, endTime, functionPerformedId, reasonTermination, createdAt);
            const workHistoryDB = workHistory.toDBModel();
            yield this.workHistoryDatabase.insert(workHistoryDB);
        });
        this.getWorkHistory = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idToFind } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const workyHistoryConjunto = yield this.workHistoryDatabase.getByUserId(idToFind);
            const workHistorys = workyHistoryConjunto.map((workHistoryDB) => {
                const workHistory = new workHistory_1.WorkHisotry(workHistoryDB.id, workHistoryDB.user_id, workHistoryDB.company_name, workHistoryDB.factory_name, workHistoryDB.state_province, workHistoryDB.line_of_business, workHistoryDB.start_time, workHistoryDB.end_time, workHistoryDB.function_performed_id, workHistoryDB.reason_termination, workHistoryDB.created_at);
                return workHistory.toBusinessModel();
            });
            return workHistorys;
        });
        this.deleteWorkHistory = (input) => __awaiter(this, void 0, void 0, function* () {
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
            const workHistoryDB = yield this.workHistoryDatabase.getById(idToDelete);
            if (!workHistoryDB) {
                throw new BadRequestError_1.BadRequestError("Item não existe");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN && payload.id !== workHistoryDB.user_id) {
                throw new BadRequestError_1.BadRequestError("Somente o criador pode deletar");
            }
            yield this.workHistoryDatabase.delete(idToDelete);
        });
        this.updateWorkHistory = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, companyName, factoryName, stateProvince, lineOfBusiness, startTime, endTime, functionPerformedId, reasonTermination, idToUpdate } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof companyName !== "string") {
                throw new BadRequestError_1.BadRequestError("'companyName' deve ser string");
            }
            if (typeof factoryName !== "string") {
                throw new BadRequestError_1.BadRequestError("'factoryName' deve ser string");
            }
            if (typeof stateProvince !== "string") {
                throw new BadRequestError_1.BadRequestError("'stateProvince' deve ser string");
            }
            if (typeof lineOfBusiness !== "string") {
                throw new BadRequestError_1.BadRequestError("'lineOfBusiness' deve ser string");
            }
            if (typeof startTime !== "string") {
                throw new BadRequestError_1.BadRequestError("'startTime' deve ser string");
            }
            if (typeof endTime !== "string") {
                throw new BadRequestError_1.BadRequestError("'endTime' deve ser string");
            }
            if (typeof functionPerformedId !== "string") {
                throw new BadRequestError_1.BadRequestError("'functionPerformedId' deve ser string");
            }
            if (typeof reasonTermination !== "string") {
                throw new BadRequestError_1.BadRequestError("'reasonTermination' deve ser string");
            }
            if (typeof idToUpdate !== "string") {
                throw new BadRequestError_1.BadRequestError("'idToUpdate' deve ser string");
            }
            const workHistoryExist = yield this.workHistoryDatabase.getById(idToUpdate);
            if (!workHistoryExist) {
                throw new BadRequestError_1.BadRequestError("'idToUpdate' inválido");
            }
            const workHistory = new workHistory_1.WorkHisotry(payload.id, idToUpdate, companyName, factoryName, stateProvince, lineOfBusiness, startTime, endTime, functionPerformedId, reasonTermination, workHistoryExist.created_at);
            const workHistoryDB = workHistory.toDBModel();
            yield this.workHistoryDatabase.update(idToUpdate, workHistoryDB);
        });
    }
}
exports.WorkHistoryBusiness = WorkHistoryBusiness;
