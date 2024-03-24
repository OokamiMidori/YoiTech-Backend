"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetailRouter = void 0;
const express_1 = __importDefault(require("express"));
const userDetailController_1 = require("../controller/userDetailController");
const UserDetailBusiness_1 = require("../business/UserDetailBusiness");
const UserDatabase_1 = require("../dataBase/UserDatabase");
const UserDetailDatabase_1 = require("../dataBase/UserDetailDatabase");
const TokenManager_1 = require("../services/TokenManager");
exports.UserDetailRouter = express_1.default.Router();
const userDetailController = new userDetailController_1.UserDetailController(new UserDetailBusiness_1.UserDetailBusiness(new UserDatabase_1.UserDatabase(), new UserDetailDatabase_1.UserDetailDatabase(), new TokenManager_1.TokenManager()));
exports.UserDetailRouter.post("/", userDetailController.create);
exports.UserDetailRouter.get("/", userDetailController.get);
exports.UserDetailRouter.delete("/", userDetailController.delete);
exports.UserDetailRouter.put("/", userDetailController.update);
