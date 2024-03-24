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
exports.MoveDisponibilityDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class MoveDisponibilityDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (moveDisponibilityDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(MoveDisponibilityDatabase.TABLE_MOVEDISPONIBILITY)
                .insert(moveDisponibilityDB);
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            BaseDatabase_1.BaseDatabase.connection(MoveDisponibilityDatabase.TABLE_MOVEDISPONIBILITY).delete()
                .where({ user_id: id });
        });
        this.update = (id, moveDisponibilityDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(MoveDisponibilityDatabase.TABLE_MOVEDISPONIBILITY)
                .update(moveDisponibilityDB)
                .where({ user_id: id });
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(MoveDisponibilityDatabase.TABLE_MOVEDISPONIBILITY)
                .select()
                .where({ user_id: id });
            return result[0];
        });
    }
}
exports.MoveDisponibilityDatabase = MoveDisponibilityDatabase;
MoveDisponibilityDatabase.TABLE_MOVEDISPONIBILITY = "move_disponibility";
