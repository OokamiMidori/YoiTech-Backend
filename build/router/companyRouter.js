"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRouter = void 0;
const express_1 = __importDefault(require("express"));
const companyController_1 = require("../controller/companyController");
const CompanyBusiness_1 = require("../business/CompanyBusiness");
const CompanyDatabase_1 = require("../dataBase/CompanyDatabase");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
exports.CompanyRouter = express_1.default.Router();
const companyController = new companyController_1.CompanyController(new CompanyBusiness_1.CompanyBusiness(new CompanyDatabase_1.CompanyDatabase(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager()));
exports.CompanyRouter.post("/signup", companyController.signup);
exports.CompanyRouter.post("/login", companyController.login);
exports.CompanyRouter.put("/emailActivation", companyController.emailActivation);
exports.CompanyRouter.get("/company", companyController.get);
