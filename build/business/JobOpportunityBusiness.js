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
exports.JobOpportunityBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const jobOpportunity_1 = require("../models/jobOpportunity");
const TokenManager_1 = require("../services/TokenManager");
class JobOpportunityBusiness {
    constructor(jobOpportunityDatabase, tokenManager, idGenerator, hashManager) {
        this.jobOpportunityDatabase = jobOpportunityDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.insertjobOpportunity = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, functionPerformedId, city, hourlyWage, shift, overtime, minAge, maxAge, japaneseCoversationStatus, japaneseReadingStatus, driverLicense, typeDriverLicense, profissionalLicenseId, minHeight, maxHeight, minWeight, maxWeight, minUniformSize, maxUniformSize, glass, tatoo, pircing, smooker, dominantHand, detailsJobOppotunity, cep, stateProvince } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof functionPerformedId !== "string") {
                throw new BadRequestError_1.BadRequestError("'functoinPerformedId' deve ser string");
            }
            if (typeof city !== "string") {
                throw new BadRequestError_1.BadRequestError("'city' deve ser string");
            }
            if (typeof hourlyWage !== "string") {
                throw new BadRequestError_1.BadRequestError("'hourlyWage' deve ser string");
            }
            if (typeof shift !== "string") {
                throw new BadRequestError_1.BadRequestError("'shift' deve ser string");
            }
            if (typeof overtime !== "string") {
                throw new BadRequestError_1.BadRequestError("'overtime' deve ser string");
            }
            if (typeof minAge !== "number") {
                throw new BadRequestError_1.BadRequestError("'minAge' deve ser number");
            }
            if (typeof maxAge !== "number") {
                throw new BadRequestError_1.BadRequestError("'maxAge' deve ser string");
            }
            if (typeof japaneseCoversationStatus !== "number") {
                throw new BadRequestError_1.BadRequestError("'japaneseConversationStatus' deve ser number");
            }
            if (typeof japaneseReadingStatus !== "number") {
                throw new BadRequestError_1.BadRequestError("'japaneseReadingStatus' deve ser number");
            }
            if (typeof driverLicense !== "string") {
                throw new BadRequestError_1.BadRequestError("'driverLicense' deve ser string");
            }
            if (typeof typeDriverLicense !== "string") {
                throw new BadRequestError_1.BadRequestError("'typeOfDriverLicense' deve ser string");
            }
            if (typeof profissionalLicenseId !== "string") {
                throw new BadRequestError_1.BadRequestError("'profissionalLicenseId' deve ser string");
            }
            if (typeof maxHeight !== "number") {
                throw new BadRequestError_1.BadRequestError("'maxHeight' deve ser number");
            }
            if (typeof minHeight !== "number") {
                throw new BadRequestError_1.BadRequestError("'minHeight' deve ser um number");
            }
            if (typeof minWeight !== "number") {
                throw new BadRequestError_1.BadRequestError("'minWeight' deve ser number");
            }
            if (typeof maxWeight !== "number") {
                throw new BadRequestError_1.BadRequestError("'maxWeight' deve ser number");
            }
            if (typeof minUniformSize !== "string") {
                throw new BadRequestError_1.BadRequestError("'minUniformSize' deve ser string");
            }
            if (typeof maxUniformSize !== "string") {
                throw new BadRequestError_1.BadRequestError("'maxUniformSize' deve ser string");
            }
            if (typeof glass !== "string") {
                throw new BadRequestError_1.BadRequestError("'glasse' deve ser string");
            }
            if (typeof tatoo !== "string") {
                throw new BadRequestError_1.BadRequestError("'tatoo' deve ser string");
            }
            if (typeof smooker !== "string") {
                throw new BadRequestError_1.BadRequestError("'smooker' deve ser string");
            }
            if (typeof dominantHand !== "string") {
                throw new BadRequestError_1.BadRequestError("'dominantHand' deve ser string");
            }
            if (typeof detailsJobOppotunity !== "string") {
                throw new BadRequestError_1.BadRequestError("'detailsJobOpportunity' deve ser string");
            }
            if (typeof pircing !== "string") {
                throw new BadRequestError_1.BadRequestError("'pircing' deve ser string");
            }
            if (typeof cep !== "string") {
                throw new BadRequestError_1.BadRequestError("'cep' deve ser string");
            }
            if (typeof stateProvince !== "string") {
                throw new BadRequestError_1.BadRequestError("'stateProvince' deve ser string");
            }
            const createdAt = new Date().toISOString();
            const id = this.idGenerator.generate();
            const evaluation = 0;
            const jobOpportunity = new jobOpportunity_1.JobOpportunity(id, payload.id, functionPerformedId, city, cep, stateProvince, hourlyWage, shift, overtime, minAge, maxAge, japaneseCoversationStatus, japaneseReadingStatus, driverLicense, typeDriverLicense, profissionalLicenseId, minHeight, maxHeight, minWeight, maxWeight, minUniformSize, maxUniformSize, glass, tatoo, pircing, smooker, dominantHand, detailsJobOppotunity, evaluation, createdAt);
            const jobOpportunityDB = jobOpportunity.toDBModel();
            yield this.jobOpportunityDatabase.insert(jobOpportunityDB);
        });
        this.deleteJobOpportunity = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idToDelete } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const jobOpportunityexist = yield this.jobOpportunityDatabase.getById(idToDelete);
            if (!jobOpportunityexist) {
                throw new BadRequestError_1.BadRequestError("idToDelete inválido");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN && payload.id !== jobOpportunityexist.company_id) {
                throw new BadRequestError_1.BadRequestError("Sómente o quem criou o objeto pode deletar");
            }
            yield this.jobOpportunityDatabase.delete(idToDelete);
        });
        this.updateJobOpportunity = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idToUpdate, functionPerformedId, city, hourlyWage, shift, overtime, minAge, maxAge, japaneseCoversationStatus, japaneseReadingStatus, driverLicense, typeDriverLicense, profissionalLicenseId, minHeight, maxHeight, minWeight, maxWeight, minUniformSize, maxUniformSize, glass, tatoo, pircing, smooker, dominantHand, detailsJobOppotunity, cep, stateProvince, evaluation } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof functionPerformedId !== "string") {
                throw new BadRequestError_1.BadRequestError("'functoinPerformedId' deve ser string");
            }
            if (typeof city !== "string") {
                throw new BadRequestError_1.BadRequestError("'city' deve ser string");
            }
            if (typeof hourlyWage !== "string") {
                throw new BadRequestError_1.BadRequestError("'hourlyWage' deve ser string");
            }
            if (typeof shift !== "string") {
                throw new BadRequestError_1.BadRequestError("'shift' deve ser string");
            }
            if (typeof overtime !== "string") {
                throw new BadRequestError_1.BadRequestError("'overtime' deve ser string");
            }
            if (typeof minAge !== "number") {
                throw new BadRequestError_1.BadRequestError("'minAge' deve ser number");
            }
            if (typeof maxAge !== "number") {
                throw new BadRequestError_1.BadRequestError("'maxAge' deve ser string");
            }
            if (typeof japaneseCoversationStatus !== "number") {
                throw new BadRequestError_1.BadRequestError("'japaneseConversationStatus' deve ser number");
            }
            if (typeof japaneseReadingStatus !== "number") {
                throw new BadRequestError_1.BadRequestError("'japaneseReadingStatus' deve ser number");
            }
            if (typeof driverLicense !== "string") {
                throw new BadRequestError_1.BadRequestError("'driverLicense' deve ser string");
            }
            if (typeof typeDriverLicense !== "string") {
                throw new BadRequestError_1.BadRequestError("'typeOfDriverLicense' deve ser string");
            }
            if (typeof profissionalLicenseId !== "string") {
                throw new BadRequestError_1.BadRequestError("'profissionalLicenseId' deve ser string");
            }
            if (typeof maxHeight !== "number") {
                throw new BadRequestError_1.BadRequestError("'maxHeight' deve ser number");
            }
            if (typeof minHeight !== "number") {
                throw new BadRequestError_1.BadRequestError("'minHeight' deve ser um number");
            }
            if (typeof minWeight !== "number") {
                throw new BadRequestError_1.BadRequestError("'minWeight' deve ser number");
            }
            if (typeof maxWeight !== "number") {
                throw new BadRequestError_1.BadRequestError("'maxWeight' deve ser number");
            }
            if (typeof minUniformSize !== "string") {
                throw new BadRequestError_1.BadRequestError("'minUniformSize' deve ser string");
            }
            if (typeof maxUniformSize !== "string") {
                throw new BadRequestError_1.BadRequestError("'maxUniformSize' deve ser string");
            }
            if (typeof glass !== "string") {
                throw new BadRequestError_1.BadRequestError("'glasse' deve ser string");
            }
            if (typeof tatoo !== "string") {
                throw new BadRequestError_1.BadRequestError("'tatoo' deve ser string");
            }
            if (typeof smooker !== "string") {
                throw new BadRequestError_1.BadRequestError("'smooker' deve ser string");
            }
            if (typeof dominantHand !== "string") {
                throw new BadRequestError_1.BadRequestError("'dominantHand' deve ser string");
            }
            if (typeof detailsJobOppotunity !== "string") {
                throw new BadRequestError_1.BadRequestError("'detailsJobOpportunity' deve ser string");
            }
            if (typeof pircing !== "string") {
                throw new BadRequestError_1.BadRequestError("'pircing' deve ser string");
            }
            if (typeof cep !== "string") {
                throw new BadRequestError_1.BadRequestError("'cep' deve ser string");
            }
            if (typeof stateProvince !== "string") {
                throw new BadRequestError_1.BadRequestError("'stateProvince' deve ser string");
            }
            if (typeof evaluation !== "number") {
                throw new BadRequestError_1.BadRequestError("'evaluation' deve ser number");
            }
            if (typeof idToUpdate !== "string") {
                throw new BadRequestError_1.BadRequestError("'idToUpdate' deve ser string");
            }
            const jobOpportunityExist = yield this.jobOpportunityDatabase.getById(idToUpdate);
            if (!jobOpportunityExist) {
                throw new BadRequestError_1.BadRequestError("id inválido");
            }
            const jobOpportunity = new jobOpportunity_1.JobOpportunity(jobOpportunityExist.id, jobOpportunityExist.company_id, functionPerformedId, city, cep, stateProvince, hourlyWage, shift, overtime, minAge, maxAge, japaneseCoversationStatus, japaneseReadingStatus, driverLicense, typeDriverLicense, profissionalLicenseId, minHeight, maxHeight, minWeight, maxWeight, minUniformSize, maxUniformSize, glass, tatoo, pircing, smooker, dominantHand, detailsJobOppotunity, evaluation, jobOpportunityExist.created_at);
            const jobOpportunityDB = jobOpportunity.toDBModel();
            yield this.jobOpportunityDatabase.update(idToUpdate, jobOpportunityDB);
        });
        this.getJobOpportunity = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const jobOpportunityList = yield this.jobOpportunityDatabase.getAllJobOpportunity();
            const jobOpportunitys = jobOpportunityList.map((jobOpportunityDB) => {
                const jobOpportunity = new jobOpportunity_1.JobOpportunity(jobOpportunityDB.id, jobOpportunityDB.company_id, jobOpportunityDB.function_performed_id, jobOpportunityDB.city, jobOpportunityDB.cep, jobOpportunityDB.state_province, jobOpportunityDB.hourly_wage, jobOpportunityDB.shift, jobOpportunityDB.overtime, jobOpportunityDB.min_age, jobOpportunityDB.max_age, jobOpportunityDB.japanese_coversation_status, jobOpportunityDB.japanese_reading_status, jobOpportunityDB.driver_license, jobOpportunityDB.type_driver_license, jobOpportunityDB.profissional_license_id, jobOpportunityDB.min_height, jobOpportunityDB.max_height, jobOpportunityDB.min_weight, jobOpportunityDB.max_weight, jobOpportunityDB.min_uniform_size, jobOpportunityDB.max_uniform_size, jobOpportunityDB.glass, jobOpportunityDB.tatoo, jobOpportunityDB.pircing, jobOpportunityDB.smooker, jobOpportunityDB.dominant_hand, jobOpportunityDB.details_job_oppotunity, jobOpportunityDB.evaluation, jobOpportunityDB.created_at);
                return jobOpportunity.toBusinessModel();
            });
            return jobOpportunitys;
        });
    }
}
exports.JobOpportunityBusiness = JobOpportunityBusiness;
