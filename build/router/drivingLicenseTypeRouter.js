"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrivingLicenseTypeRouter = void 0;
const express_1 = __importDefault(require("express"));
const drivingLicenseTypeController_1 = require("../controller/drivingLicenseTypeController");
const DrivingLicenseTypeBusiness_1 = require("../business/DrivingLicenseTypeBusiness");
const DrivingLicenseTypeDatabase_1 = require("../dataBase/DrivingLicenseTypeDatabase");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
exports.DrivingLicenseTypeRouter = express_1.default.Router();
const drivingLicenseTypeController = new drivingLicenseTypeController_1.DrivingLicenseTypeController(new DrivingLicenseTypeBusiness_1.DrivingLicenseTypeBusiness(new DrivingLicenseTypeDatabase_1.DrivingLicenseTypeDatabase(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager()));
exports.DrivingLicenseTypeRouter.post("/", drivingLicenseTypeController.create);
exports.DrivingLicenseTypeRouter.get("/", drivingLicenseTypeController.get);
