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
exports.JobOpportunityController = void 0;
const BaseError_1 = require("../errors/BaseError");
class JobOpportunityController {
    constructor(jobOpportunityBusiness) {
        this.jobOpportunityBusiness = jobOpportunityBusiness;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    functionPerformedId: req.body.functionPerformedId,
                    city: req.body.city,
                    hourlyWage: req.body.hourlyWage,
                    shift: req.body.shift,
                    overtime: req.body.overtime,
                    minAge: req.body.minAge,
                    maxAge: req.body.maxAge,
                    japaneseCoversationStatus: req.body.japaneseConversationStatus,
                    japaneseReadingStatus: req.body.japaneseReadingStatus,
                    driverLicense: req.body.driverLicense,
                    typeDriverLicense: req.body.typeDriverLicense,
                    profissionalLicenseId: req.body.profissionalLicenseId,
                    minHeight: req.body.minHeight,
                    maxHeight: req.body.maxHeight,
                    minWeight: req.body.minWeight,
                    maxWeight: req.body.maxWeight,
                    minUniformSize: req.body.minUniformSize,
                    maxUniformSize: req.body.maxUniformSize,
                    glass: req.body.glass,
                    tatoo: req.body.tatoo,
                    pircing: req.body.pircing,
                    smooker: req.body.smooker,
                    dominantHand: req.body.dominantHand,
                    detailsJobOppotunity: req.body.detailsJobOpportunity,
                    cep: req.body.cep,
                    stateProvince: req.body.stateProvince
                };
                yield this.jobOpportunityBusiness.insertjobOpportunity(input);
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
                yield this.jobOpportunityBusiness.deleteJobOpportunity(input);
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
                    idToUpdate: req.params.id,
                    functionPerformedId: req.body.functionPerformedId,
                    city: req.body.city,
                    hourlyWage: req.body.hourlyWage,
                    shift: req.body.shift,
                    overtime: req.body.overtime,
                    minAge: req.body.minAge,
                    maxAge: req.body.maxAge,
                    japaneseCoversationStatus: req.body.japaneseConversationStatus,
                    japaneseReadingStatus: req.body.japaneseReadingStatus,
                    driverLicense: req.body.driverLicense,
                    typeDriverLicense: req.body.typeDriverLicense,
                    profissionalLicenseId: req.body.profissionalLicenseId,
                    minHeight: req.body.minHeight,
                    maxHeight: req.body.maxHeight,
                    minWeight: req.body.minWeight,
                    maxWeight: req.body.maxWeight,
                    minUniformSize: req.body.minUniformSize,
                    maxUniformSize: req.body.maxUniformSize,
                    glass: req.body.glass,
                    tatoo: req.body.tatoo,
                    pircing: req.body.pircing,
                    smooker: req.body.smooker,
                    dominantHand: req.body.dominantHand,
                    detailsJobOppotunity: req.body.detailsJobOpportunity,
                    cep: req.body.cep,
                    stateProvince: req.body.stateProvince,
                    evaluation: req.body.evaluation
                };
                yield this.jobOpportunityBusiness.updateJobOpportunity(input);
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
                    token: req.headers.authorization
                };
                const output = yield this.jobOpportunityBusiness.getJobOpportunity(input);
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
exports.JobOpportunityController = JobOpportunityController;
