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
exports.CompanyLogoDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class CompanyLogoDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (companyLogoDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(CompanyLogoDatabase.TABLE_COMPANY_LOGO)
                .insert(companyLogoDB);
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(CompanyLogoDatabase.TABLE_COMPANY_LOGO)
                .select();
            return result;
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(CompanyLogoDatabase.TABLE_COMPANY_LOGO)
                .select()
                .where({ id });
            return result[0];
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(CompanyLogoDatabase.TABLE_COMPANY_LOGO)
                .delete()
                .where({ id });
        });
        this.update = (id, companyLogoDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(CompanyLogoDatabase.TABLE_COMPANY_LOGO)
                .update(companyLogoDB)
                .where({ id });
        });
        this.getUserId = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(CompanyLogoDatabase.TABLE_COMPANY_LOGO)
                .select()
                .where("company_logo.user_id", userId);
            return result[0];
        });
    }
}
exports.CompanyLogoDatabase = CompanyLogoDatabase;
CompanyLogoDatabase.TABLE_COMPANY_LOGO = "company_logo";
