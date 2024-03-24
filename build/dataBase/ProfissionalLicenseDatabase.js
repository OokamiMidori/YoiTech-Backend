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
exports.ProfissionalLicenseDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class ProfissionalLicenseDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (profissionalLicenseDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(ProfissionalLicenseDatabase.TABLE_PROFISSIONAL_LICENSE)
                .insert(profissionalLicenseDB);
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(ProfissionalLicenseDatabase.TABLE_PROFISSIONAL_LICENSE)
                .select()
                .where({ id });
            return result[0];
        });
        this.update = (id, profissionalLicenseDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(ProfissionalLicenseDatabase.TABLE_PROFISSIONAL_LICENSE)
                .update(profissionalLicenseDB)
                .where({ id });
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            BaseDatabase_1.BaseDatabase.connection(ProfissionalLicenseDatabase.TABLE_PROFISSIONAL_LICENSE)
                .delete()
                .where({ id });
        });
        this.getAllProfissionalLicensenses = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(ProfissionalLicenseDatabase.TABLE_PROFISSIONAL_LICENSE)
                .select();
            return result;
        });
        this.getByContent = (content) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(ProfissionalLicenseDatabase.TABLE_PROFISSIONAL_LICENSE).select().where({ content });
            return result[0];
        });
    }
}
exports.ProfissionalLicenseDatabase = ProfissionalLicenseDatabase;
ProfissionalLicenseDatabase.TABLE_PROFISSIONAL_LICENSE = "profissional_license";
