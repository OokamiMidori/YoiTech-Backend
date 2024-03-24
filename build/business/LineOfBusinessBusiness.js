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
exports.LineOfBusinessBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const LineOfBusiness_1 = require("../models/LineOfBusiness");
const TokenManager_1 = require("../services/TokenManager");
class LineOfBusinessBusiness {
    constructor(lineOfBusinessDatabase, tokenManager, idGenerator, hashManager) {
        this.lineOfBusinessDatabase = lineOfBusinessDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.createLineOfBusiness = (input) => __awaiter(this, void 0, void 0, function* () {
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
            const lineOfBusinessOk = yield this.lineOfBusinessDatabase.getLineOfBusinessByContent(content);
            if (lineOfBusinessOk) {
                throw new BadRequestError_1.BadRequestError("Item já existe");
            }
            const id = this.idGenerator.generate();
            const createdAt = new Date().toISOString();
            const newLineOfBusiness = new LineOfBusiness_1.LineOfBusiness(id, content, createdAt);
            const LineOfBusinessDB = newLineOfBusiness.toDBModel();
            yield this.lineOfBusinessDatabase.insert(LineOfBusinessDB);
        });
        this.getLineOfBusiness = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const lineOfBusinessDB = yield this.lineOfBusinessDatabase.getAllLineOfBusiness();
            const lineOfBusiness = lineOfBusinessDB.map((lineOfBusinessDB) => {
                const lineOfBusiness = new LineOfBusiness_1.LineOfBusiness(lineOfBusinessDB.id, lineOfBusinessDB.content, lineOfBusinessDB.created_at);
                return lineOfBusiness.toBusinessModel();
            });
            return lineOfBusiness;
        });
        this.deleteLineOfBusiness = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, id } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const lineOfBusinessDB = yield this.lineOfBusinessDatabase.getById(id);
            if (!lineOfBusinessDB) {
                throw new BadRequestError_1.BadRequestError("'id' não encontrado");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN) {
                throw new BadRequestError_1.BadRequestError("Somente o Adiministrador pode deletar");
            }
            yield this.lineOfBusinessDatabase.delete(id);
        });
        this.editLineOfBusiness = (input) => __awaiter(this, void 0, void 0, function* () {
            const { idToEdit, token, content } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const lineOfBusinessDB = yield this.lineOfBusinessDatabase.getById(idToEdit);
            if (!lineOfBusinessDB) {
                throw new BadRequestError_1.BadRequestError("'id' não encontrado");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN) {
                throw new BadRequestError_1.BadRequestError("Somente o Adiministrador pode editar");
            }
            if (content !== "string") {
                throw new BadRequestError_1.BadRequestError("'content' deve ser string");
            }
            const lineOfBusiness = new LineOfBusiness_1.LineOfBusiness(lineOfBusinessDB.id, lineOfBusinessDB.content, lineOfBusinessDB.created_at);
            lineOfBusiness.setContent(content);
            const updatedLineOfBusiness = lineOfBusiness.toDBModel();
            yield this.lineOfBusinessDatabase.update(idToEdit, updatedLineOfBusiness);
        });
    }
}
exports.LineOfBusinessBusiness = LineOfBusinessBusiness;
