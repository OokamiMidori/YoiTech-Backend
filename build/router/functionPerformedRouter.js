"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionPerformedRouter = void 0;
const express_1 = __importDefault(require("express"));
const functionPerformedController_1 = require("../controller/functionPerformedController");
const FunctionPerformedBusiness_1 = require("../business/FunctionPerformedBusiness");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
const FunctionPerformedDatabase_1 = require("../dataBase/FunctionPerformedDatabase");
exports.FunctionPerformedRouter = express_1.default.Router();
const functionPerformedController = new functionPerformedController_1.FunctionPerformedController(new FunctionPerformedBusiness_1.FunctionPerformedBusiness(new FunctionPerformedDatabase_1.FunctionPerformedDatabase(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager()));
exports.FunctionPerformedRouter.post("/", functionPerformedController.create);
exports.FunctionPerformedRouter.get("/", functionPerformedController.getFunctionPerformed);
exports.FunctionPerformedRouter.delete("/:id", functionPerformedController.deleteFunctionPerformed);
exports.FunctionPerformedRouter.put("/:id", functionPerformedController.updateFunctionPerformed);
