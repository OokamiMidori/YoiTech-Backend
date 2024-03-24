"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdressRouter = void 0;
const express_1 = __importDefault(require("express"));
const userAdressController_1 = require("../controller/userAdressController");
const UserAdressBusiness_1 = require("../business/UserAdressBusiness");
const UserAdressDatabase_1 = require("../dataBase/UserAdressDatabase");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
exports.UserAdressRouter = express_1.default.Router();
const userAdressController = new userAdressController_1.UserAdressController(new UserAdressBusiness_1.UserAdressBusiness(new UserAdressDatabase_1.UserAdressDatabase(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager()));
exports.UserAdressRouter.post("/", userAdressController.create);
exports.UserAdressRouter.get("/", userAdressController.get);
exports.UserAdressRouter.put("/:id", userAdressController.update);
exports.UserAdressRouter.delete("/:id", userAdressController.delete);
