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
exports.MoveDisponibilityController = void 0;
const BaseError_1 = require("../errors/BaseError");
class MoveDisponibilityController {
    constructor(moveDisponibilityBusiness) {
        this.moveDisponibilityBusiness = moveDisponibilityBusiness;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    availabilityTOMove: req.body.availabilityTOMove,
                    needHousing: req.body.needHousing,
                    needTransportationToMove: req.body.needTransportationToMove,
                    pet: req.body.pet,
                    petType: req.body.petType
                };
                yield this.moveDisponibilityBusiness.createMoveDisponibility(input);
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
                    availabilityTOMove: req.body.availabilityTOMove,
                    needHousing: req.body.needHousing,
                    needTransportationToMove: req.body.needTransportationToMove,
                    pet: req.body.pet,
                    petType: req.body.petType
                };
                yield this.moveDisponibilityBusiness.editMoveDisponibility(input);
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
                yield this.moveDisponibilityBusiness.deleteMoveDisponibility(input);
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
                    userId: req.params.id
                };
                const output = yield this.moveDisponibilityBusiness.getMoveDisponibility(input);
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
exports.MoveDisponibilityController = MoveDisponibilityController;
