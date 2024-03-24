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
exports.UserAdressDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserAdressDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (userAdressDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserAdressDatabase.TABLE_USER_ADRESS)
                .insert(userAdressDB);
        });
        this.getByUserId = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(UserAdressDatabase.TABLE_USER_ADRESS)
                .select()
                .where("user_adress.user_id", id);
            return result[0];
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserAdressDatabase.TABLE_USER_ADRESS)
                .delete()
                .where("user_adress.user_id", id);
        });
        this.update = (id, userAdressDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserAdressDatabase.TABLE_USER_ADRESS)
                .update(userAdressDB)
                .where("user_adress.user_id", id);
        });
        this.getAllUserAdress = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(UserAdressDatabase.TABLE_USER_ADRESS)
                .select();
            return result;
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(UserAdressDatabase.TABLE_USER_ADRESS)
                .select()
                .where({ id });
            return result[0];
        });
    }
}
exports.UserAdressDatabase = UserAdressDatabase;
UserAdressDatabase.TABLE_USER_ADRESS = "user_adress";
