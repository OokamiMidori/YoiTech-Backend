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
exports.FunctionPerformedBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const TokenManager_1 = require("../services/TokenManager");
const functionPerformed_1 = require("../models/functionPerformed");
class FunctionPerformedBusiness {
    constructor(functionPerformedDatabase, tokenManager, idGenerator, hashManager) {
        this.functionPerformedDatabase = functionPerformedDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.createFunctionPerformedDatabase = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, lineOfBusinessId, content } = input;
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
            if (lineOfBusinessId !== "string") {
                throw new BadRequestError_1.BadRequestError("'lineOfBusinessId' deve ser uma string");
            }
            const functionPerformedOk = yield this.functionPerformedDatabase.getByContent(content);
            if (functionPerformedOk) {
                throw new BadRequestError_1.BadRequestError("Item já existe");
            }
            const id = this.idGenerator.generate();
            const createdAt = new Date().toISOString();
            const newFunctionPerformed = new functionPerformed_1.FunctionPerformed(id, lineOfBusinessId, content, createdAt);
            const functionPerformedDB = newFunctionPerformed.toDBModel();
            yield this.functionPerformedDatabase.insert(functionPerformedDB);
        });
        this.getFunctionPerformed = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const functionPerformedDB = yield this.functionPerformedDatabase.getAll();
            const functionPerformed = functionPerformedDB.map((functionperformedDB) => {
                const functionPerformed = new functionPerformed_1.FunctionPerformed(functionperformedDB.id, functionperformedDB.line_of_business_id, functionperformedDB.content, functionperformedDB.created_at);
                return functionPerformed.toBusinessModel();
            });
            return functionPerformed;
        });
        this.deleteFunctionPerformed = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, id } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const functionPerformedDB = yield this.functionPerformedDatabase.getById(id);
            if (!functionPerformedDB) {
                throw new BadRequestError_1.BadRequestError("'id' não encotrado");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN) {
                throw new BadRequestError_1.BadRequestError("Somente Adiministrador pode deletar o item");
            }
            yield this.functionPerformedDatabase.delete(id);
        });
        this.editFunctionPerformed = (input) => __awaiter(this, void 0, void 0, function* () {
            const { idToEdit, token, content } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const functionPerformedDB = yield this.functionPerformedDatabase.getById(idToEdit);
            if (!functionPerformedDB) {
                throw new BadRequestError_1.BadRequestError("'id' não encontrado");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN) {
                throw new BadRequestError_1.BadRequestError("Somente usuário admin pode editar");
            }
            if (content !== "string") {
                throw new BadRequestError_1.BadRequestError("'content' deve ser string");
            }
            const functionPerformed = new functionPerformed_1.FunctionPerformed(functionPerformedDB.id, functionPerformedDB.line_of_business_id, functionPerformedDB.content, functionPerformedDB.created_at);
            functionPerformed.setContent(content);
            const updatedFunctionPerformed = functionPerformed.toDBModel();
            yield this.functionPerformedDatabase.update(idToEdit, updatedFunctionPerformed);
        });
    }
}
exports.FunctionPerformedBusiness = FunctionPerformedBusiness;
