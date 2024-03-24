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
exports.FunctionPerformedDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class FunctionPerformedDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (functionPerformedDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(FunctionPerformedDatabase.TABLE_FUNCTION_PERFORMED)
                .insert(functionPerformedDB);
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(FunctionPerformedDatabase.TABLE_FUNCTION_PERFORMED)
                .select()
                .where({ id });
            return result[0];
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(FunctionPerformedDatabase.TABLE_FUNCTION_PERFORMED)
                .select();
            return result;
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(FunctionPerformedDatabase.TABLE_FUNCTION_PERFORMED)
                .delete()
                .where({ id });
        });
        this.update = (id, functionPerformedDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(FunctionPerformedDatabase.TABLE_FUNCTION_PERFORMED)
                .update(functionPerformedDB)
                .where({ id });
        });
        this.getByContent = (content) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(FunctionPerformedDatabase.TABLE_FUNCTION_PERFORMED).select().where({ content });
            return result[0];
        });
    }
}
exports.FunctionPerformedDatabase = FunctionPerformedDatabase;
FunctionPerformedDatabase.TABLE_FUNCTION_PERFORMED = "function_performed";
