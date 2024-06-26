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
exports.SiteRatingDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class SiteRatingDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (siteRatingDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(SiteRatingDatabase.TABLE_SITE_RATING)
                .insert(siteRatingDB);
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(SiteRatingDatabase.TABLE_SITE_RATING)
                .select()
                .where({ id });
            return result[0];
        });
        this.update = (id, siteRatingDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(SiteRatingDatabase.TABLE_SITE_RATING)
                .update(siteRatingDB)
                .where({ id });
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(SiteRatingDatabase.TABLE_SITE_RATING)
                .delete()
                .where({ id });
        });
        this.getAllRating = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(SiteRatingDatabase.TABLE_SITE_RATING)
                .select();
            return result;
        });
    }
}
exports.SiteRatingDatabase = SiteRatingDatabase;
SiteRatingDatabase.TABLE_SITE_RATING = "site_rating";
