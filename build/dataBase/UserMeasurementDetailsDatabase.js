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
exports.UserMeasurementDetailsDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserMeasurementDetailsDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.isert = (userMeasurementDetailsDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserMeasurementDetailsDatabase.TABLE_USER_MEASUREMENT_DETAILS)
                .insert(userMeasurementDetailsDB);
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(UserMeasurementDetailsDatabase.TABLE_USER_MEASUREMENT_DETAILS)
                .select()
                .where("user_measurement_details.user_id", id);
            return result[0];
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserMeasurementDetailsDatabase.TABLE_USER_MEASUREMENT_DETAILS)
                .delete()
                .where("user_measurement_details.user_id", id);
        });
        this.update = (id, userMeasurementDetailsDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserMeasurementDetailsDatabase.TABLE_USER_MEASUREMENT_DETAILS)
                .update(userMeasurementDetailsDB)
                .where("user_measurement_details.user_id", id);
        });
    }
}
exports.UserMeasurementDetailsDatabase = UserMeasurementDetailsDatabase;
UserMeasurementDetailsDatabase.TABLE_USER_MEASUREMENT_DETAILS = "user_measurement_details";
