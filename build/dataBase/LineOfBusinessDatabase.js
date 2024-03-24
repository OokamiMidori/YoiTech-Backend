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
exports.LineOfBusinessDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class LineOfBusinessDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (lineOfBusinessDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(LineOfBusinessDatabase.TABLE_LINE_OF_BUSINESS)
                .insert(lineOfBusinessDB);
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(LineOfBusinessDatabase.TABLE_LINE_OF_BUSINESS)
                .select()
                .where({ id });
            return result[0];
        });
        this.update = (id, lineOfBusinessDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(LineOfBusinessDatabase.TABLE_LINE_OF_BUSINESS)
                .update(lineOfBusinessDB)
                .where({ id });
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(LineOfBusinessDatabase.TABLE_LINE_OF_BUSINESS)
                .delete()
                .where({ id });
        });
        this.getAllLineOfBusiness = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(LineOfBusinessDatabase.TABLE_LINE_OF_BUSINESS)
                .select();
            return result;
        });
        this.getLineOfBusinessByContent = (content) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(LineOfBusinessDatabase.TABLE_LINE_OF_BUSINESS)
                .select()
                .where({ content });
            return result[0];
        });
    }
}
exports.LineOfBusinessDatabase = LineOfBusinessDatabase;
LineOfBusinessDatabase.TABLE_LINE_OF_BUSINESS = "line_of_business";
