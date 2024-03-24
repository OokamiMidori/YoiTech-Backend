"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyAdressRouter = void 0;
const express_1 = __importDefault(require("express"));
const companyAdressController_1 = require("../controller/companyAdressController");
const CompanyAdressBusiness_1 = require("../business/CompanyAdressBusiness");
const CompanyAdressDatabase_1 = require("../dataBase/CompanyAdressDatabase");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
exports.CompanyAdressRouter = express_1.default.Router();
const companyAdressController = new companyAdressController_1.CompanyAdressController(new CompanyAdressBusiness_1.CompanyAdressBusiness(new CompanyAdressDatabase_1.CompanyAdressDatabase(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator()));
exports.CompanyAdressRouter.post("/", companyAdressController.create);
exports.CompanyAdressRouter.delete("/:id", companyAdressController.delete);
exports.CompanyAdressRouter.put("/:id", companyAdressController.update);
exports.CompanyAdressRouter.get("/:id", companyAdressController.get);
