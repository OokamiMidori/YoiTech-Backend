"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserJobRouter = void 0;
const express_1 = __importDefault(require("express"));
const userJobController_1 = require("../controller/userJobController");
const UserJobBusiness_1 = require("../business/UserJobBusiness");
const UserJobDatabase_1 = require("../dataBase/UserJobDatabase");
const TokenManager_1 = require("../services/TokenManager");
exports.UserJobRouter = express_1.default.Router();
const userJobController = new userJobController_1.UserJobController(new UserJobBusiness_1.UserJobBusiness(new UserJobDatabase_1.UserJobDatabase(), new TokenManager_1.TokenManager()));
exports.UserJobRouter.post("/", userJobController.create);
exports.UserJobRouter.get("/", userJobController.get);
exports.UserJobRouter.delete("/:id", userJobController.delete);
exports.UserJobRouter.put("/", userJobController.edit);
