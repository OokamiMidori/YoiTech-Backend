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
exports.CompanyAdressBusiness = void 0;
const TokenManager_1 = require("../services/TokenManager");
const BadRequestError_1 = require("../errors/BadRequestError");
const companyAdress_1 = require("../models/companyAdress");
class CompanyAdressBusiness {
    constructor(companyAdressDatabase, tokenManager, idGenerator) {
        this.companyAdressDatabase = companyAdressDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.createCompanyAdress = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, companyId, cep, city, neighborhood, apartment } = input;
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
            if (typeof cep !== "string") {
                throw new BadRequestError_1.BadRequestError("'cep' deve ser string");
            }
            if (typeof city !== "string") {
                throw new BadRequestError_1.BadRequestError("'city' deve ser string");
            }
            if (typeof neighborhood !== "string") {
                throw new BadRequestError_1.BadRequestError("'neighborhood' deve ser string");
            }
            if (typeof apartment !== "string") {
                throw new BadRequestError_1.BadRequestError("'apartment' deve ser string");
            }
            const id = this.idGenerator.generate();
            const createdAt = new Date().toISOString();
            const companyAdress = new companyAdress_1.CompanyAdress(id, companyId, cep, city, neighborhood, apartment, createdAt);
            const companyAdressDB = companyAdress.toDBModel();
            yield this.companyAdressDatabase.insert(companyAdressDB);
        });
        this.deleteCompanyAdress = (input) => __awaiter(this, void 0, void 0, function* () {
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
            const companyAdressDB = yield this.companyAdressDatabase.getById(idToDelete);
            if (!companyAdressDB) {
                throw new BadRequestError_1.BadRequestError("'idToDelete' inválido");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN && payload.id !== companyAdressDB.id) {
                throw new BadRequestError_1.BadRequestError("'idToDelete' inválido");
            }
            yield this.companyAdressDatabase.delete(idToDelete);
        });
        this.updateUserAdress = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idToUpdate, cep, city, neighborhood, apartment, companyId } = input;
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
            if (typeof cep !== "string") {
                throw new BadRequestError_1.BadRequestError("'cep' deve ser string");
            }
            if (typeof city !== "string") {
                throw new BadRequestError_1.BadRequestError("'city' deve ser string");
            }
            if (typeof neighborhood !== "string") {
                throw new BadRequestError_1.BadRequestError("'neighborhood' deve ser string");
            }
            if (typeof apartment !== "string") {
                throw new BadRequestError_1.BadRequestError("'apartment' deve ser string");
            }
            if (typeof idToUpdate !== "string") {
                throw new BadRequestError_1.BadRequestError("'idToDelete' deve ser string");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN && payload.id !== companyId) {
                throw new BadRequestError_1.BadRequestError("Só quem criou pode modificar");
            }
            const companyAdressExist = yield this.companyAdressDatabase.getById(idToUpdate);
            if (!companyAdressExist) {
                throw new BadRequestError_1.BadRequestError("'idToUpdate' inválido");
            }
            const createdAt = new Date().toISOString();
            const companyAdress = new companyAdress_1.CompanyAdress(idToUpdate, companyId, cep, city, neighborhood, apartment, createdAt);
            const companyAdressDB = companyAdress.toDBModel();
            yield this.companyAdressDatabase.update(idToUpdate, companyAdressDB);
        });
        this.getCompanyAdress = (input) => __awaiter(this, void 0, void 0, function* () {
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
            const companyAdressDB = yield this.companyAdressDatabase.getByCompanyId(companyId);
            if (!companyAdressDB) {
                throw new BadRequestError_1.BadRequestError("company não possui endereço cadastrado");
            }
            const companyAdress = new companyAdress_1.CompanyAdress(companyAdressDB.id, companyAdressDB.company_id, companyAdressDB.cep, companyAdressDB.city, companyAdressDB.neighborhood, companyAdressDB.apartment, companyAdressDB.created_at);
            const companyAdressModel = companyAdress.toBusinessModel();
            return companyAdressModel;
        });
    }
}
exports.CompanyAdressBusiness = CompanyAdressBusiness;
