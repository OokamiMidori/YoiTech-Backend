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
exports.MessageDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class MessageDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (messageDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
                .insert(messageDB);
        });
        this.update = (id, messageDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
                .update(messageDB)
                .where({ id });
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
                .delete()
                .where({ id });
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
                .select()
                .where({ id });
            return result[0];
        });
        this.getAllMessage = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
                .select();
            return result;
        });
        this.getAllMessageByCompanyId = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
                .select()
                .where("message.company_id", id);
            return result;
        });
        this.getAllMessageByUserId = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
                .select()
                .where("message.user_id", id);
            return result;
        });
        this.getAllMessageByCreatorId = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
                .select()
                .where("message.creator_id", id);
            return result;
        });
    }
}
exports.MessageDatabase = MessageDatabase;
MessageDatabase.TABLE_MESSAGE = "message";
