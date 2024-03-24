"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveDisponibilityRouter = void 0;
const express_1 = __importDefault(require("express"));
const moveDisponibilityController_1 = require("../controller/moveDisponibilityController");
const MoveDisponibilityBusiness_1 = require("../business/MoveDisponibilityBusiness");
const MoveDisponibilityDataBase_1 = require("../dataBase/MoveDisponibilityDataBase");
const TokenManager_1 = require("../services/TokenManager");
exports.MoveDisponibilityRouter = express_1.default.Router();
const moveDisponibilityController = new moveDisponibilityController_1.MoveDisponibilityController(new MoveDisponibilityBusiness_1.MoveDisponibilityBusiness(new MoveDisponibilityDataBase_1.MoveDisponibilityDatabase(), new TokenManager_1.TokenManager()));
exports.MoveDisponibilityRouter.post("/", moveDisponibilityController.create);
exports.MoveDisponibilityRouter.put("/", moveDisponibilityController.update);
exports.MoveDisponibilityRouter.get("/:id", moveDisponibilityController.get);
exports.MoveDisponibilityRouter.delete("/:id", moveDisponibilityController.delete);
