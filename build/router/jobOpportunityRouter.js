"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobOpportunityRouter = void 0;
const express_1 = __importDefault(require("express"));
const jobOpportunityController_1 = require("../controller/jobOpportunityController");
const JobOpportunityBusiness_1 = require("../business/JobOpportunityBusiness");
const JobOpportunityDatabase_1 = require("../dataBase/JobOpportunityDatabase");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
exports.JobOpportunityRouter = express_1.default.Router();
const jobOpportunityController = new jobOpportunityController_1.JobOpportunityController(new JobOpportunityBusiness_1.JobOpportunityBusiness(new JobOpportunityDatabase_1.JobOpportunityDatabase(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager()));
exports.JobOpportunityRouter.post("/", jobOpportunityController.create);
exports.JobOpportunityRouter.delete("/:id", jobOpportunityController.delete);
exports.JobOpportunityRouter.put("/:id", jobOpportunityController.update);
exports.JobOpportunityRouter.get("/", jobOpportunityController.get);
