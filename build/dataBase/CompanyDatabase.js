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
exports.CompanyDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class CompanyDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (companyDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(CompanyDatabase.TABLE_COMPANY)
                .insert(companyDB);
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(CompanyDatabase.TABLE_COMPANY)
                .select();
            return result;
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(CompanyDatabase.TABLE_COMPANY)
                .select()
                .where({ id });
            return result[0];
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(CompanyDatabase.TABLE_COMPANY)
                .delete()
                .where({ id });
        });
        this.update = (id, companyDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(CompanyDatabase.TABLE_COMPANY)
                .update(companyDB)
                .where({ id });
        });
        this.findByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(CompanyDatabase.TABLE_COMPANY)
                .select()
                .where({ email });
            return result[0];
        });
    }
}
exports.CompanyDatabase = CompanyDatabase;
CompanyDatabase.TABLE_COMPANY = "company";
