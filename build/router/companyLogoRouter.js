"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyLogoRouter = void 0;
const express_1 = __importDefault(require("express"));
const companyLogoController_1 = require("../controller/companyLogoController");
const CompanyLogoBusiness_1 = require("../business/CompanyLogoBusiness");
const CompanyLogoDatabase_1 = require("../dataBase/CompanyLogoDatabase");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
exports.CompanyLogoRouter = express_1.default.Router();
const companyLogoController = new companyLogoController_1.CompanyLogoController(new CompanyLogoBusiness_1.CompanyLogoBusiness(new CompanyLogoDatabase_1.CompanyLogoDatabase(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator()));
exports.CompanyLogoRouter.post("/", companyLogoController.create);
exports.CompanyLogoRouter.get("/:id", companyLogoController.get);
exports.CompanyLogoRouter.put("/:id", companyLogoController.update);
exports.CompanyLogoRouter.delete("/:id", companyLogoController.delete);
