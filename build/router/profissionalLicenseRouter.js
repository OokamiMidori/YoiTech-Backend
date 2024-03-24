"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfissionalLicenseRouter = void 0;
const express_1 = __importDefault(require("express"));
const profissionalLicenseController_1 = require("../controller/profissionalLicenseController");
const ProfissionalLicenseBusiness_1 = require("../business/ProfissionalLicenseBusiness");
const ProfissionalLicenseDatabase_1 = require("../dataBase/ProfissionalLicenseDatabase");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
exports.ProfissionalLicenseRouter = express_1.default.Router();
const profissionalLicenseController = new profissionalLicenseController_1.ProfissionalLicenseController(new ProfissionalLicenseBusiness_1.ProfissionalLicenseBusiness(new ProfissionalLicenseDatabase_1.ProfissionalLicenseDatabase(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager()));
exports.ProfissionalLicenseRouter.post("/", profissionalLicenseController.create);
exports.ProfissionalLicenseRouter.get("/", profissionalLicenseController.get);
exports.ProfissionalLicenseRouter.put("/:id", profissionalLicenseController.edit);
exports.ProfissionalLicenseRouter.delete("/:id", profissionalLicenseController.delete);
