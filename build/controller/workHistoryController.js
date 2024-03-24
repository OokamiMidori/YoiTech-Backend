"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkHistoryController = void 0;
const BaseError_1 = require("../errors/BaseError");
class WorkHistoryController {
    constructor(workHistoryBusiness) {
        this.workHistoryBusiness = workHistoryBusiness;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    companyName: req.body.companyName,
                    factoryName: req.body.factoryName,
                    stateProvince: req.body.stateProvince,
                    lineOfBusiness: req.body.lineOfBusines,
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
                    functionPerformedId: req.body.functionPerformedId,
                    reasonTermination: req.body.reasonTermination
                };
                yield this.workHistoryBusiness.createWorkHistory(input);
                res.status(201).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    companyName: req.body.companyName,
                    factoryName: req.body.factoryName,
                    stateProvince: req.body.stateProvince,
                    lineOfBusiness: req.body.lineOfBusines,
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
                    functionPerformedId: req.body.functionPerformedId,
                    reasonTermination: req.body.reasonTermination,
                    idToUpdate: req.params.id
                };
                yield this.workHistoryBusiness.updateWorkHistory(input);
                res.status(201).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    idToDelete: req.params.id
                };
                yield this.workHistoryBusiness.deleteWorkHistory(input);
                res.status(201).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    idToFind: req.params.id
                };
                const output = yield this.workHistoryBusiness.getWorkHistory(input);
                res.status(201).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
    }
}
exports.WorkHistoryController = WorkHistoryController;
