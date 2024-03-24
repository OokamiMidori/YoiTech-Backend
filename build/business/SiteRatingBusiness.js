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
exports.SiteRatingBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const TokenManager_1 = require("../services/TokenManager");
const siteRating_1 = require("../models/siteRating");
class SiteRatingBusiness {
    constructor(siteRatingDatabase, idGenerator, tokenManager, companyDatabase) {
        this.siteRatingDatabase = siteRatingDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.companyDatabase = companyDatabase;
        this.createSiteRating = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, companyId, rating, message } = input;
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
            if (typeof rating !== "number") {
                throw new BadRequestError_1.BadRequestError("'rating' deve ser number");
            }
            if (typeof message !== "string") {
                throw new BadRequestError_1.BadRequestError("'message' deve ser string");
            }
            const company = yield this.companyDatabase.getById(companyId);
            if (!company) {
                throw new BadRequestError_1.BadRequestError("'companyId' inválido");
            }
            const createdAt = new Date().toISOString();
            const id = this.idGenerator.generate();
            const siteRating = new siteRating_1.SiteRating(id, companyId, rating, message, createdAt);
            const siteRatingDB = siteRating.toDBModel();
            yield this.siteRatingDatabase.insert(siteRatingDB);
        });
        this.deleteSiteRating = (input) => __awaiter(this, void 0, void 0, function* () {
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
            const siteRatingDB = yield this.siteRatingDatabase.getById(idToDelete);
            if (!siteRatingDB) {
                throw new BadRequestError_1.BadRequestError("'idToDelete' inválido");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN && payload.id !== siteRatingDB.company_id) {
                throw new BadRequestError_1.BadRequestError("Somente quem criou pode deletar");
            }
            yield this.siteRatingDatabase.delete(idToDelete);
        });
        this.getSiteRating = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const siteRatingsDB = yield this.siteRatingDatabase.getAllRating();
            const siteRatings = siteRatingsDB.map((siteRatingDB) => {
                const siteRating = new siteRating_1.SiteRating(siteRatingDB.id, siteRatingDB.company_id, siteRatingDB.rating, siteRatingDB.message, siteRatingDB.created_at);
                return siteRating.toBusinessModel();
            });
            return siteRatings;
        });
    }
}
exports.SiteRatingBusiness = SiteRatingBusiness;
