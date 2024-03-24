"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineOfBusinessRouter = void 0;
const express_1 = __importDefault(require("express"));
const LineOfBusinessController_1 = require("../controller/LineOfBusinessController");
const LineOfBusinessBusiness_1 = require("../business/LineOfBusinessBusiness");
const LineOfBusinessDatabase_1 = require("../dataBase/LineOfBusinessDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenManager_1 = require("../services/TokenManager");
const HashManager_1 = require("../services/HashManager");
exports.LineOfBusinessRouter = express_1.default.Router();
const lineOfBusinessController = new LineOfBusinessController_1.LineOfBusinessController(new LineOfBusinessBusiness_1.LineOfBusinessBusiness(new LineOfBusinessDatabase_1.LineOfBusinessDatabase(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager()));
exports.LineOfBusinessRouter.post("/", lineOfBusinessController.create);
exports.LineOfBusinessRouter.get("/", lineOfBusinessController.getLineOfBusiness);
exports.LineOfBusinessRouter.delete(":id", lineOfBusinessController.deleteLineOfBusiness);
exports.LineOfBusinessRouter.put("/id", lineOfBusinessController.editLineOfBusiness);
