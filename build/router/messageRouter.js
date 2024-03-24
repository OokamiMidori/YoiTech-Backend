"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRouter = void 0;
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controller/messageController");
const MessageBusiness_1 = require("../business/MessageBusiness");
const MessageDatabase_1 = require("../dataBase/MessageDatabase");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
const UserDatabase_1 = require("../dataBase/UserDatabase");
const CompanyDatabase_1 = require("../dataBase/CompanyDatabase");
exports.MessageRouter = express_1.default.Router();
const messageController = new messageController_1.MessageController(new MessageBusiness_1.MessageBusiness(new MessageDatabase_1.MessageDatabase(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new UserDatabase_1.UserDatabase(), new CompanyDatabase_1.CompanyDatabase()));
exports.MessageRouter.post("/", messageController.createMessage);
exports.MessageRouter.get("/user/:id", messageController.getMessageByUserId);
exports.MessageRouter.get("/company/:id", messageController.getMessageByCompanyId);
exports.MessageRouter.get("/creator/:id", messageController.getMessageByCreatorId);
exports.MessageRouter.delete("/:id", messageController.delete);
