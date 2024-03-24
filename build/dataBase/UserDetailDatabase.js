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
exports.UserDetailDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserDetailDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (userDetailDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserDetailDatabase.TABLE_USER_DETAIL)
                .insert(userDetailDB);
        });
        this.findByid = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(UserDetailDatabase.TABLE_USER_DETAIL)
                .select()
                .where("user_detail", id);
            return result[0];
        });
        this.delete = (userId) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserDetailDatabase.TABLE_USER_DETAIL)
                .delete()
                .where({ user_id: userId });
        });
        this.update = (userId, userDetailDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(UserDetailDatabase.TABLE_USER_DETAIL)
                .update(userDetailDB)
                .where({ user_id: userId });
        });
    }
}
exports.UserDetailDatabase = UserDetailDatabase;
UserDetailDatabase.TABLE_USER_DETAIL = "user_detail";
