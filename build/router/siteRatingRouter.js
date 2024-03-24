"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteRatingRouter = void 0;
const express_1 = __importDefault(require("express"));
const siteRatingController_1 = require("../controller/siteRatingController");
const SiteRatingBusiness_1 = require("../business/SiteRatingBusiness");
const SiteRatingDatabase_1 = require("../dataBase/SiteRatingDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenManager_1 = require("../services/TokenManager");
const CompanyDatabase_1 = require("../dataBase/CompanyDatabase");
exports.SiteRatingRouter = express_1.default.Router();
const siteRatingController = new siteRatingController_1.SiteRatingController(new SiteRatingBusiness_1.SiteRatingBusiness(new SiteRatingDatabase_1.SiteRatingDatabase(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager(), new CompanyDatabase_1.CompanyDatabase()));
exports.SiteRatingRouter.post("/:id", siteRatingController.create);
exports.SiteRatingRouter.delete("/:id", siteRatingController.delete);
exports.SiteRatingRouter.get("/ratings", siteRatingController.getRating);
