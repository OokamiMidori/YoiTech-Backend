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
exports.ProfissionalLicenseBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const profissionalLIcense_1 = require("../models/profissionalLIcense");
const TokenManager_1 = require("../services/TokenManager");
class ProfissionalLicenseBusiness {
    constructor(profissionalLicenseDatabase, tokenManager, idGenerator, hashManager) {
        this.profissionalLicenseDatabase = profissionalLicenseDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.createProfissionalLicense = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, content } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (content !== "string") {
                throw new BadRequestError_1.BadRequestError("'content' dever ser string");
            }
            const profissionalLicenseOk = yield this.profissionalLicenseDatabase.getByContent(content);
            if (profissionalLicenseOk) {
                throw new BadRequestError_1.BadRequestError("Item já existe");
            }
            const id = this.idGenerator.generate();
            const createdAt = new Date().toISOString();
            const newProfissionalLicense = new profissionalLIcense_1.ProfissionalLicense(id, content, createdAt);
            const ProfissionalLicenseDB = newProfissionalLicense.toDBModel();
            yield this.profissionalLicenseDatabase.insert(ProfissionalLicenseDB);
        });
        this.getProfissionalLicense = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const profissionalLicenseDB = yield this.profissionalLicenseDatabase.getAllProfissionalLicensenses();
            const profissionalLicense = profissionalLicenseDB.map((profissionalLicenseDB) => {
                const profissionalLicense = new profissionalLIcense_1.ProfissionalLicense(profissionalLicenseDB.id, profissionalLicenseDB.content, profissionalLicenseDB.created_at);
                return profissionalLicense.toBusinessModel();
            });
            return profissionalLicense;
        });
        this.deleteProfissionalLicense = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idToDelete } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const profissionalLicenseDB = yield this.profissionalLicenseDatabase.getById(idToDelete);
            if (!profissionalLicenseDB) {
                throw new BadRequestError_1.BadRequestError("'id' não encontrado");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN) {
                throw new BadRequestError_1.BadRequestError("Somente adiministrador pode deletar");
            }
            yield this.profissionalLicenseDatabase.delete(idToDelete);
        });
        this.editProfissionalLicense = (input) => __awaiter(this, void 0, void 0, function* () {
            const { idToEdit, token, content } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const profissionalLicenseDB = yield this.profissionalLicenseDatabase.getById(idToEdit);
            if (!profissionalLicenseDB) {
                throw new BadRequestError_1.BadRequestError("'id' inválido");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN) {
                throw new BadRequestError_1.BadRequestError("Somente o administrador pode editar");
            }
            if (content !== "string") {
                throw new BadRequestError_1.BadRequestError("'content' deve ser string");
            }
            const profissionalLicense = new profissionalLIcense_1.ProfissionalLicense(profissionalLicenseDB.id, profissionalLicenseDB.content, profissionalLicenseDB.created_at);
            profissionalLicense.setContent(content);
            const updatedProfissionalLicense = profissionalLicense.toDBModel();
            yield this.profissionalLicenseDatabase.update(idToEdit, updatedProfissionalLicense);
        });
    }
}
exports.ProfissionalLicenseBusiness = ProfissionalLicenseBusiness;
