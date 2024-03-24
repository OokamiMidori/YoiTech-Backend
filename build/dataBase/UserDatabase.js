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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (userDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USER)
                .insert(userDB);
        });
        this.findByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USER)
                .select()
                .where({ email });
            return result[0];
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USER)
                .select()
                .where({ id });
            return result[0];
        });
        this.deleteUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USER)
                .delete()
                .where({ id });
        });
        this.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USER)
                .select();
            return result;
        });
        this.getUserComplete = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USER)
                .select("user.id", "user.name", "user.email", "user.role", "user.phone_number", "user.birth_date", "user.gender", "user.nationality", "user.marital_status", "user_img.img AS img", "user_adress.cep AS cep_number", "user_adress.city", "user_adress.neighborhood AS neighborhood", "user_adress.apartment", "move_disponibility.availability_to_move", "move_disponibility.need_housing", "move_disponibility.need_transportation_to_move", "user_measurement_details.height", "user_measurement_details.weight", "user_measurement_details.uniform_shirt", "user_measurement_details.uniform_pants", "user_measurement_details.glasses", "user_measurement_details.dominant_hand", "user_measurement_details.tatoo", "user_measurement_details.piercing", "user_measurement_details.smooker", "user_detail.driving_license", "user_detail.license_type_id AS license_type", "user_detail.means_of_transport", "user_detail.grade_level", "user_detail.profissional_license_id AS profissional_license", "user_detail.japanese_conversation_status", "user_detail.japanese_reading_status", "user_detail.japanese_visa_type", "user_detail.japanese_child_status", "user_detail.child_number AS number_of_children", "user_detail.child_school_age AS school_age", "city.name AS city_name")
                .join("user_adress", "user.id", "=", "user_adress.user_id")
                .join("move_disponiblity", "user.id", "=", "move_disponibility.user_id")
                .join("user_measurement_details", "user.id", "=", "user_measurement_detail.user_id")
                .join("user_img", "user.id", "=", "user_img.user_id")
                .join("user_detail", "user.id", "=", "user_detail.user_id")
                .join("city", "user_adress.city_id", "=", "city.id")
                .where("user.id", id);
            return result[0];
        });
        this.updateUser = (id, userDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserDatabase.TABLE_USER)
                .update(userDB)
                .where({ id });
        });
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_USER = "user";
UserDatabase.TABLE_USER_ADRESS = "user_adress";
UserDatabase.TABLE_USER_DETAIL = "user_detail";
UserDatabase.TABLE_USER_JOB = "user_job";
UserDatabase.TABLE_USER_MEASUREMENT_DETAILS = "user_measurement_details";
UserDatabase.TABLE_USER_MOVE_DISPONIBILITY = "move_disponibility";
UserDatabase.TABLE_USER_WIRK_HISTORY = "work_history";
UserDatabase.TABLE_USER_IMG = "user_img";
