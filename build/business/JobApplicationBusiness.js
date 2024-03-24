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
exports.JobApplicationBusiness = void 0;
const Types_1 = require("../Types");
const BadRequestError_1 = require("../errors/BadRequestError");
const jobApplication_1 = require("../models/jobApplication");
const TokenManager_1 = require("../services/TokenManager");
class JobApplicationBusiness {
    constructor(jobApplicationDatabase, tokenManager, idGenerator, jobOpportunity) {
        this.jobApplicationDatabase = jobApplicationDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.jobOpportunity = jobOpportunity;
        this.insertJobApplication = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, jobOpportunityId } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof jobOpportunityId !== "string") {
                throw new BadRequestError_1.BadRequestError("'jobOpportunityId' deve ser string");
            }
            const userId = payload.id;
            const id = this.idGenerator.generate();
            const status = Types_1.APPLICATION_STATUS.ESPERA;
            const createdAt = new Date().toISOString();
            const jobApplicationExist = yield this.jobApplicationDatabase.getByUserID(userId);
            if (jobApplicationExist) {
                throw new BadRequestError_1.BadRequestError("Usuário já inscrito");
            }
            const jobApplication = new jobApplication_1.JobApplication(id, jobOpportunityId, userId, status, createdAt);
            const jobApplicationDB = jobApplication.toDBModel();
            yield this.jobApplicationDatabase.insert(jobApplicationDB);
        });
        this.acceptApplication = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idApplication } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof idApplication !== "string") {
                throw new BadRequestError_1.BadRequestError("'idApplication' deve ser string");
            }
            const jobApplicationExist = yield this.jobApplicationDatabase.getById(idApplication);
            if (!jobApplicationExist) {
                throw new BadRequestError_1.BadRequestError("'idApplication' inválido");
            }
            const jobOpportunityCreator = yield this.jobOpportunity.getByCompanyId(payload.id);
            if (!jobOpportunityCreator && payload.role === TokenManager_1.USER_ROLES.NORMAL) {
                throw new BadRequestError_1.BadRequestError("Não possui vagas cadastradas nesse Id");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN && payload.id !== jobOpportunityCreator.company_id) {
                throw new BadRequestError_1.BadRequestError("Só o criador pode aceitar ou aceitar");
            }
            const novoStatus = Types_1.APPLICATION_STATUS.APROVADO;
            const updatedAt = new Date().toISOString();
            const jobApplication = new jobApplication_1.JobApplication(jobApplicationExist.id, jobApplicationExist.job_opportunity_id, jobApplicationExist.user_id, novoStatus, updatedAt);
            const jobApplicationDB = jobApplication.toDBModel();
            yield this.jobApplicationDatabase.update(idApplication, jobApplicationDB);
        });
        this.denyApplication = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idApplication } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof idApplication !== "string") {
                throw new BadRequestError_1.BadRequestError("'idApplication' deve ser string");
            }
            const jobApplicationExist = yield this.jobApplicationDatabase.getById(idApplication);
            if (!jobApplicationExist) {
                throw new BadRequestError_1.BadRequestError("'idApplication' inválido");
            }
            const jobOpportunityCreator = yield this.jobOpportunity.getByCompanyId(payload.id);
            if (!jobOpportunityCreator && payload.role === TokenManager_1.USER_ROLES.NORMAL) {
                throw new BadRequestError_1.BadRequestError("Não possui vagas cadastradas nesse Id");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN && payload.id !== jobOpportunityCreator.company_id) {
                throw new BadRequestError_1.BadRequestError("Só o criador pode aceitar ou recusar");
            }
            const novoStatus = Types_1.APPLICATION_STATUS.RECUSADO;
            const updatedAt = new Date().toISOString();
            const jobApplication = new jobApplication_1.JobApplication(jobApplicationExist.id, jobApplicationExist.job_opportunity_id, jobApplicationExist.user_id, novoStatus, updatedAt);
            const jobApplicationDB = jobApplication.toDBModel();
            yield this.jobApplicationDatabase.update(idApplication, jobApplicationDB);
        });
        this.deletejobApplication = (input) => __awaiter(this, void 0, void 0, function* () {
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
            const jobApplicationExist = yield this.jobApplicationDatabase.getById(idToDelete);
            if (!jobApplicationExist) {
                throw new BadRequestError_1.BadRequestError("'id' inválido");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN && jobApplicationExist.user_id !== payload.id) {
                throw new BadRequestError_1.BadRequestError("Sómente o quem se inscreveu pode deletar");
            }
            yield this.jobApplicationDatabase.delete(idToDelete);
        });
        this.getJobApplicationbyUserId = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const userId = payload.id;
            const jobApplicationsDB = yield this.jobApplicationDatabase.getByUserID(userId);
            const jobApplicationsModel = jobApplicationsDB.map((jobApplicationDB) => {
                const jobApplication = new jobApplication_1.JobApplication(jobApplicationDB.id, jobApplicationDB.job_opportunity_id, jobApplicationDB.user_id, jobApplicationDB.status, jobApplicationDB.created_at);
                return jobApplication.toBusinessModel();
            });
            return jobApplicationsModel;
        });
    }
}
exports.JobApplicationBusiness = JobApplicationBusiness;
