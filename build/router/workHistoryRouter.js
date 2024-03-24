"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkHistoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const workHistoryController_1 = require("../controller/workHistoryController");
const WorkHistoryBusiness_1 = require("../business/WorkHistoryBusiness");
const WorkHistoryDatabase_1 = require("../dataBase/WorkHistoryDatabase");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
exports.WorkHistoryRouter = express_1.default.Router();
const workHistoryController = new workHistoryController_1.WorkHistoryController(new WorkHistoryBusiness_1.WorkHistoryBusiness(new WorkHistoryDatabase_1.WorkHistoryDatabase(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator()));
exports.WorkHistoryRouter.post("/", workHistoryController.create);
exports.WorkHistoryRouter.put("/:id", workHistoryController.update);
exports.WorkHistoryRouter.get("/:id", workHistoryController.get);
exports.WorkHistoryRouter.delete("/:id", workHistoryController.delete);
