"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingCompanyRouter = void 0;
const express_1 = __importDefault(require("express"));
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const ratingCompanyController_1 = require("../controller/ratingCompanyController");
const RatingCompanyBusiness_1 = require("../business/RatingCompanyBusiness");
const RatingCompanyDatabase_1 = require("../dataBase/RatingCompanyDatabase");
const JobApplicationDatabase_1 = require("../dataBase/JobApplicationDatabase");
exports.RatingCompanyRouter = express_1.default.Router();
const ratingCompanyController = new ratingCompanyController_1.RatingCompanyController(new RatingCompanyBusiness_1.RatingCompanyBusiness(new RatingCompanyDatabase_1.RatingCompanyDatabase(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new JobApplicationDatabase_1.JobApplicationDatabase()));
exports.RatingCompanyRouter.post("/:id", ratingCompanyController.create);
exports.RatingCompanyRouter.delete("/:id", ratingCompanyController.delete);
exports.RatingCompanyRouter.get("/", ratingCompanyController.getRatingCompanyId);
