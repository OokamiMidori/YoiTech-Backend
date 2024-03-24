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
exports.JobOpportunityDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class JobOpportunityDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (jobOpportunityDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(JobOpportunityDatabase.TABLE_JOB_OPPORTUNITY)
                .insert(jobOpportunityDB);
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(JobOpportunityDatabase.TABLE_JOB_OPPORTUNITY)
                .select()
                .where({ id });
            return result[0];
        });
        this.getAllJobOpportunity = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(JobOpportunityDatabase.TABLE_JOB_OPPORTUNITY)
                .select();
            return result;
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(JobOpportunityDatabase.TABLE_JOB_OPPORTUNITY)
                .delete()
                .where({ id });
        });
        this.update = (id, jobOpportunityDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(JobOpportunityDatabase.TABLE_JOB_OPPORTUNITY)
                .update(jobOpportunityDB)
                .where({ id });
        });
        this.getByCompanyId = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(JobOpportunityDatabase.TABLE_JOB_OPPORTUNITY)
                .select()
                .where("job_application.company_id", id);
            return result[0];
        });
    }
}
exports.JobOpportunityDatabase = JobOpportunityDatabase;
JobOpportunityDatabase.TABLE_JOB_OPPORTUNITY = "job_opportunity";
