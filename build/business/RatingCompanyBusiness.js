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
exports.RatingCompanyBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const ratingCompany_1 = require("../models/ratingCompany");
const TokenManager_1 = require("../services/TokenManager");
class RatingCompanyBusiness {
    constructor(ratingCompanyDatabase, tokenManager, idGenerator, jobApplicationDatabase) {
        this.ratingCompanyDatabase = ratingCompanyDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.jobApplicationDatabase = jobApplicationDatabase;
        this.createCompanyRating = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, applicationId, rating, message } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof applicationId !== "string") {
                throw new BadRequestError_1.BadRequestError("'applicationId' deve ser string");
            }
            if (typeof rating !== "number") {
                throw new BadRequestError_1.BadRequestError("'rating' deve ser number");
            }
            if (typeof message !== "string") {
                throw new BadRequestError_1.BadRequestError("'message' deve ser string");
            }
            const id = this.idGenerator.generate();
            const applicationDB = yield this.jobApplicationDatabase.getById(applicationId);
            if (!applicationDB) {
                throw new BadRequestError_1.BadRequestError("'applicationId' inválido");
            }
            const createdAt = new Date().toISOString();
            const ratingCompany = new ratingCompany_1.RatingCompany(id, applicationId, rating, message, createdAt);
            const ratingCompanyDB = ratingCompany.toDBModel();
            yield this.ratingCompanyDatabase.insert(ratingCompanyDB);
        });
        this.deleteRating = (input) => __awaiter(this, void 0, void 0, function* () {
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
            const ratingCompanyDB = yield this.ratingCompanyDatabase.getById(idToDelete);
            if (!ratingCompanyDB) {
                throw new BadRequestError_1.BadRequestError("'idToDelete' inválido");
            }
            const application = yield this.jobApplicationDatabase.getById(ratingCompanyDB.application_id);
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN && payload.id !== application.user_id) {
                throw new BadRequestError_1.BadRequestError("Sómente o criador pode deletar");
            }
            yield this.ratingCompanyDatabase.delete(idToDelete);
        });
        this.getRatingCompanyByCompanyId = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const ratingCompanysDB = yield this.ratingCompanyDatabase.getAllRating();
            const ratingCompanys = ratingCompanysDB.map((ratingCompanyDB) => {
                const ratingCompany = new ratingCompany_1.RatingCompany(ratingCompanyDB.id, ratingCompanyDB.application_id, ratingCompanyDB.rating, ratingCompanyDB.message, ratingCompanyDB.created_at);
                return ratingCompany.toBusinessModel();
            });
            return ratingCompanys;
        });
    }
}
exports.RatingCompanyBusiness = RatingCompanyBusiness;
