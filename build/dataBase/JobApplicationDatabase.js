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
exports.JobApplicationDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class JobApplicationDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (jobApplicationDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(JobApplicationDatabase.TABLE_JOB_APPLICATION)
                .insert(jobApplicationDB);
        });
        this.update = (id, jobApplicationDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(JobApplicationDatabase.TABLE_JOB_APPLICATION)
                .update(jobApplicationDB)
                .where({ id });
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(JobApplicationDatabase.TABLE_JOB_APPLICATION)
                .delete()
                .where({ id });
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(JobApplicationDatabase.TABLE_JOB_APPLICATION)
                .select()
                .where({ id });
            return result[0];
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(JobApplicationDatabase.TABLE_JOB_APPLICATION)
                .select();
            return result;
        });
        this.getByUserID = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(JobApplicationDatabase.TABLE_JOB_APPLICATION)
                .select()
                .where("job_application.user_id", userId);
            return result;
        });
    }
}
exports.JobApplicationDatabase = JobApplicationDatabase;
JobApplicationDatabase.TABLE_JOB_APPLICATION = "job_application";
