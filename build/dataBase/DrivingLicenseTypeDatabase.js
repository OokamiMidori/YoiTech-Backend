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
exports.DrivingLicenseTypeDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class DrivingLicenseTypeDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (drivingLincenseTypeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(DrivingLicenseTypeDatabase.TABLE_DRIVING_LICENSE_TYPE)
                .insert(drivingLincenseTypeDB);
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(DrivingLicenseTypeDatabase.TABLE_DRIVING_LICENSE_TYPE)
                .select()
                .where({ id });
            return result[0];
        });
        this.getByContent = (content) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(DrivingLicenseTypeDatabase.TABLE_DRIVING_LICENSE_TYPE)
                .select()
                .where({ content });
            return result[0];
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(DrivingLicenseTypeDatabase.TABLE_DRIVING_LICENSE_TYPE)
                .select();
            return result;
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(DrivingLicenseTypeDatabase.TABLE_DRIVING_LICENSE_TYPE)
                .delete()
                .where({ id });
        });
        this.update = (id, drivingLincenseTypeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(DrivingLicenseTypeDatabase.TABLE_DRIVING_LICENSE_TYPE)
                .update(drivingLincenseTypeDB)
                .where({ id });
        });
    }
}
exports.DrivingLicenseTypeDatabase = DrivingLicenseTypeDatabase;
DrivingLicenseTypeDatabase.TABLE_DRIVING_LICENSE_TYPE = "driving_license_type";
