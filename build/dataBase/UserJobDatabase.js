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
exports.UserJobDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserJobDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(UserJobDatabase.TABLE_USER_JOB)
                .select()
                .where("user_job.user_id", id);
            return result[0];
        });
        this.insert = (userJobDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserJobDatabase.TABLE_USER_JOB)
                .insert(userJobDB);
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserJobDatabase.TABLE_USER_JOB)
                .delete()
                .where("user_job.user_id", id);
        });
        this.update = (id, userJobDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserJobDatabase.TABLE_USER_JOB)
                .update(userJobDB)
                .where("user_job.user_id", id);
        });
    }
}
exports.UserJobDatabase = UserJobDatabase;
UserJobDatabase.TABLE_USER_JOB = "user_job";
