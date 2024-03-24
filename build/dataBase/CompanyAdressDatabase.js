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
exports.CompanyAdressDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class CompanyAdressDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (companyAdressDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(CompanyAdressDatabase.TABLE_COMPANY_ADRESS)
                .insert(companyAdressDB);
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            BaseDatabase_1.BaseDatabase.connection(CompanyAdressDatabase.TABLE_COMPANY_ADRESS)
                .delete()
                .where({ id });
        });
        this.update = (id, companyAdressDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(CompanyAdressDatabase.TABLE_COMPANY_ADRESS)
                .update(companyAdressDB)
                .where({ id });
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(CompanyAdressDatabase.TABLE_COMPANY_ADRESS)
                .select()
                .where({ id });
            return result[0];
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(CompanyAdressDatabase.TABLE_COMPANY_ADRESS)
                .select();
            return result;
        });
        this.getByCompanyId = (companyId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(CompanyAdressDatabase.TABLE_COMPANY_ADRESS)
                .select()
                .where("company_adress.companyid", companyId);
            return result[0];
        });
    }
}
exports.CompanyAdressDatabase = CompanyAdressDatabase;
CompanyAdressDatabase.TABLE_COMPANY_ADRESS = "company_adress";
