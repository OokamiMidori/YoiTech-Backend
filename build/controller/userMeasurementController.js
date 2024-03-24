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
exports.UserMeasurementController = void 0;
const BaseError_1 = require("../errors/BaseError");
class UserMeasurementController {
    constructor(userMeasurimentDetailBusiness) {
        this.userMeasurimentDetailBusiness = userMeasurimentDetailBusiness;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    height: req.body.height,
                    weight: req.body.weight,
                    uniformShirt: req.body.uniformShirt,
                    uniformPants: req.body.uniformPants,
                    dominantHand: req.body.dominantHand,
                    glasses: req.body.glasses,
                    tatoo: req.body.tatoo,
                    piercing: req.body.piercing,
                    smooker: req.body.smooker,
                    medicalTreatment: req.body.medicalTreatment,
                    typeOfTreatment: req.body.typeOfTreatment
                };
                yield this.userMeasurimentDetailBusiness.createUserMeasurementDetails(input);
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
        this.edit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    height: req.body.height,
                    weight: req.body.weight,
                    uniformShirt: req.body.uniformShirt,
                    uniformPants: req.body.uniformPants,
                    dominantHand: req.body.dominantHand,
                    glasses: req.body.glasses,
                    tatoo: req.body.tatoo,
                    piercing: req.body.piercing,
                    smooker: req.body.smooker,
                    medicalTreatment: req.body.medicalTreatment,
                    typeOfTreatment: req.body.typeOfTreatment
                };
                yield this.userMeasurimentDetailBusiness.editUserMeasurementDetails(input);
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
                const output = yield this.userMeasurimentDetailBusiness.getUserMeasurementDetails(input);
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
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    idToDelete: req.params.id
                };
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
exports.UserMeasurementController = UserMeasurementController;
