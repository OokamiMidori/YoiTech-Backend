"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMeasurimentDetailsRouter = void 0;
const express_1 = __importDefault(require("express"));
const userMeasurementController_1 = require("../controller/userMeasurementController");
const UserMeasurimentDetailsBusiness_1 = require("../business/UserMeasurimentDetailsBusiness");
const UserMeasurementDetailsDatabase_1 = require("../dataBase/UserMeasurementDetailsDatabase");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
exports.UserMeasurimentDetailsRouter = express_1.default.Router();
const userMeasurimentDetailsController = new userMeasurementController_1.UserMeasurementController(new UserMeasurimentDetailsBusiness_1.UserMeasurimentDetailsBusiness(new UserMeasurementDetailsDatabase_1.UserMeasurementDetailsDatabase(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager()));
exports.UserMeasurimentDetailsRouter.post("/", userMeasurimentDetailsController.create);
exports.UserMeasurimentDetailsRouter.put("/", userMeasurimentDetailsController.edit);
exports.UserMeasurimentDetailsRouter.get("/", userMeasurimentDetailsController.get);
exports.UserMeasurimentDetailsRouter.delete("/:id", userMeasurimentDetailsController.delete);
