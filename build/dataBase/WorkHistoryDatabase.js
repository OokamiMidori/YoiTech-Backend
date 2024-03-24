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
exports.WorkHistoryDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class WorkHistoryDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (workyHistoryDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(WorkHistoryDatabase.TABLE_WORK_HISTORY)
                .insert(workyHistoryDB);
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(WorkHistoryDatabase.TABLE_WORK_HISTORY)
                .select()
                .where({ id });
            return result[0];
        });
        this.getByUserId = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(WorkHistoryDatabase.TABLE_WORK_HISTORY)
                .select()
                .where("work_history.user_id", id);
            return result;
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(WorkHistoryDatabase.TABLE_WORK_HISTORY)
                .delete()
                .where({ id });
        });
        this.update = (id, workyHistoryDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(WorkHistoryDatabase.TABLE_WORK_HISTORY)
                .update(workyHistoryDB)
                .where({ id });
        });
    }
}
exports.WorkHistoryDatabase = WorkHistoryDatabase;
WorkHistoryDatabase.TABLE_WORK_HISTORY = "work_history";
