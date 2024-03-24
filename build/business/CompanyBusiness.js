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
exports.CompanyBusiness = void 0;
const Types_1 = require("../Types");
const BadRequestError_1 = require("../errors/BadRequestError");
const company_1 = require("../models/company");
class CompanyBusiness {
    constructor(companyDatabase, tokenManager, idGenerator, hashManager) {
        this.companyDatabase = companyDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.signup = (input) => __awaiter(this, void 0, void 0, function* () {
            const { responsableCompanyName, email, password, phoneNumber, cellPhoneNumber } = input;
            if (typeof responsableCompanyName !== "string") {
                throw new BadRequestError_1.BadRequestError("'responsableName' deve ser string");
            }
            if (typeof email !== "string") {
                throw new BadRequestError_1.BadRequestError("'email' deve ser string");
            }
            if (typeof password !== "string") {
                throw new BadRequestError_1.BadRequestError("'passowrd' deve ser string");
            }
            if (typeof phoneNumber !== "string") {
                throw new BadRequestError_1.BadRequestError("'phoneNumber' deve ser string");
            }
            if (cellPhoneNumber !== "string") {
                throw new BadRequestError_1.BadRequestError("'cellPhoneNumber' deve ser string");
            }
            const hashedPassword = yield this.hashManager.hash(password);
            const id = this.idGenerator.generate();
            const role = Types_1.USER_ROLES.NORMAL;
            const emailStatus = Types_1.EMAIL_STATUS.INATIVO;
            const status = Types_1.STATUS_USER_COMPANY.ATIVO;
            const createdAt = new Date().toISOString();
            const newCompany = new company_1.Company(id, responsableCompanyName, email, hashedPassword, phoneNumber, cellPhoneNumber, role, status, emailStatus, createdAt);
            const companyDB = newCompany.toDBModel();
            yield this.companyDatabase.insert(companyDB);
            const payload = {
                id: newCompany.getId(),
                name: newCompany.getResponsableCompanyName(),
                role: newCompany.getRole()
            };
            const token = this.tokenManager.createToken(payload);
            const output = {
                token
            };
            return output;
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            if (typeof email !== "string") {
                throw new BadRequestError_1.BadRequestError("'email' deve ser string");
            }
            if (typeof password !== "string") {
                throw new BadRequestError_1.BadRequestError("'password' deve ser string");
            }
            const companyDB = yield this.companyDatabase.findByEmail(email);
            if (!companyDB) {
                throw new BadRequestError_1.BadRequestError("'email' e/ou 'senha' incorretos");
            }
            const company = new company_1.Company(companyDB.id, companyDB.responsible_company_name, companyDB.email, companyDB.password, companyDB.phone_number, companyDB.cell_phone_number, companyDB.role, companyDB.status, companyDB.email_status, companyDB.created_at);
            const hashedPassword = company.getPassword();
            const isPasswordCorrect = yield this.hashManager.compare(password, hashedPassword);
            if (!isPasswordCorrect) {
                throw new BadRequestError_1.BadRequestError("'email' e/ou 'senha' inválido(s)");
            }
            const payload = {
                id: company.getId(),
                name: company.getResponsableCompanyName(),
                role: company.getRole()
            };
            const token = this.tokenManager.createToken(payload);
            const output = {
                token
            };
            return output;
        });
        this.emailActivation = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, confirmation, token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (email !== "string") {
                throw new BadRequestError_1.BadRequestError("'email' deve ser uma string");
            }
            if (confirmation !== "boolean") {
                throw new BadRequestError_1.BadRequestError("'confirmation' deve ser boolean");
            }
            const company = yield this.companyDatabase.findByEmail(email);
            if (!company) {
                throw new BadRequestError_1.BadRequestError("'email' não encontrado");
            }
            const companyId = payload.id;
            const emailStatus = confirmation ? 1 : 0;
            const companyStatus = Types_1.EMAIL_STATUS.ATIVO;
            const CompanyConfirmed = new company_1.Company(company.id, company.responsible_company_name, company.email, company.password, company.role, company.phone_number, company.role, company.status, companyStatus, company.created_at);
            const updatedCompanyDB = CompanyConfirmed.toDBModel();
            yield this.companyDatabase.update(companyId, updatedCompanyDB);
        });
        this.getCompany = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const idToGet = payload.id;
            const companyDB = yield this.companyDatabase.getById(idToGet);
            if (!companyDB) {
                throw new BadRequestError_1.BadRequestError("Company não existe");
            }
            const company = new company_1.Company(companyDB.id, companyDB.responsible_company_name, companyDB.email, companyDB.password, companyDB.phone_number, companyDB.cell_phone_number, companyDB.role, companyDB.status, companyDB.email_status, companyDB.created_at);
            const companyBusiness = company.toBusinessModel();
            return companyBusiness;
        });
    }
}
exports.CompanyBusiness = CompanyBusiness;
