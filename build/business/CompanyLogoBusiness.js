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
exports.CompanyLogoBusiness = void 0;
const Types_1 = require("../Types");
const BadRequestError_1 = require("../errors/BadRequestError");
const companyLogo_1 = require("../models/companyLogo");
class CompanyLogoBusiness {
    constructor(companyLogoDatabase, tokenManager, idGenerator) {
        this.companyLogoDatabase = companyLogoDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.insertCompanyLogo = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, logo } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const companyLogoDBExist = yield this.companyLogoDatabase.getById(payload.id);
            if (companyLogoDBExist) {
                throw new BadRequestError_1.BadRequestError("Company já possui logo cadastrada");
            }
            if (typeof logo !== "string") {
                throw new BadRequestError_1.BadRequestError("'logo' deve ser string");
            }
            const id = this.idGenerator.generate();
            const createdAt = new Date().toISOString();
            const companyId = payload.id;
            const companyLogo = new companyLogo_1.CompanyLogo(id, companyId, logo, createdAt);
            const companyLogoDB = companyLogo.toDBModel();
            yield this.companyLogoDatabase.insert(companyLogoDB);
        });
        this.getCompanyLogo = (input) => __awaiter(this, void 0, void 0, function* () {
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
            const companyLogoExiste = yield this.companyLogoDatabase.getById(companyId);
            if (!companyLogoExiste) {
                throw new BadRequestError_1.BadRequestError("'companyId' inválido");
            }
            const companyLogo = new companyLogo_1.CompanyLogo(companyLogoExiste.id, companyLogoExiste.company_id, companyLogoExiste.logo_img, companyLogoExiste.created_at);
            const companyLogoBusiness = companyLogo.toBusinessModel();
            return companyLogoBusiness;
        });
        this.deleteCompanyLogo = (input) => __awaiter(this, void 0, void 0, function* () {
            const { idToDelete, token } = input;
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
            const companyLogoExist = yield this.companyLogoDatabase.getById(idToDelete);
            if (!companyLogoExist) {
                throw new BadRequestError_1.BadRequestError("'idToDelete' inválido");
            }
            if (payload.role !== Types_1.USER_ROLES.ADMIN && payload.id !== companyLogoExist.company_id) {
                throw new BadRequestError_1.BadRequestError("Somente o criador pode deletar");
            }
            yield this.companyLogoDatabase.delete(idToDelete);
        });
        this.updateCompanyLogo = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idToUpdate, logo } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof idToUpdate !== "string") {
                throw new BadRequestError_1.BadRequestError("'idToUpdate' deve ser string");
            }
            if (typeof logo !== "string") {
                throw new BadRequestError_1.BadRequestError("'logo' deve ser string");
            }
            const companyLogoExist = yield this.companyLogoDatabase.getById(idToUpdate);
            if (!companyLogoExist) {
                throw new BadRequestError_1.BadRequestError("'idToUpdate' inválido");
            }
            const companyLogo = new companyLogo_1.CompanyLogo(companyLogoExist.id, companyLogoExist.company_id, logo, companyLogoExist.created_at);
            const companyLogoDB = companyLogo.toDBModel();
            yield this.companyLogoDatabase.update(idToUpdate, companyLogoDB);
        });
    }
}
exports.CompanyLogoBusiness = CompanyLogoBusiness;
