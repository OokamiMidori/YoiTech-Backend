"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserImgRouter = void 0;
const express_1 = __importDefault(require("express"));
const userImgController_1 = require("../controller/userImgController");
const UserImgBusiness_1 = require("../business/UserImgBusiness");
const UserImgDatabase_1 = require("../dataBase/UserImgDatabase");
const TokenManager_1 = require("../services/TokenManager");
exports.UserImgRouter = express_1.default.Router();
const userImgController = new userImgController_1.UserImgController(new UserImgBusiness_1.UserImgBusiness(new UserImgDatabase_1.UserImgDatabase(), new TokenManager_1.TokenManager()));
exports.UserImgRouter.post("/", userImgController.create);
exports.UserImgRouter.get("/:id", userImgController.get);
exports.UserImgRouter.delete("/:id", userImgController.delete);
exports.UserImgRouter.put("/:id", userImgController.update);
