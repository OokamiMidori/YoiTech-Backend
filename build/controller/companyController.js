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
exports.CompanyController = void 0;
const BaseError_1 = require("../errors/BaseError");
class CompanyController {
    constructor(companyBusiness) {
        this.companyBusiness = companyBusiness;
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    responsableCompanyName: req.body.responsableCompanyName,
                    email: req.body.email,
                    password: req.body.password,
                    phoneNumber: req.body.phoneNumber,
                    cellPhoneNumber: req.body.cellPhoneNumber
                };
                const output = yield this.companyBusiness.signup(input);
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
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    email: req.body.email,
                    password: req.body.password
                };
                const output = yield this.companyBusiness.login(input);
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
        this.emailActivation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    confirmation: req.body.confirmation,
                    email: req.body.email
                };
                yield this.companyBusiness.emailActivation(input);
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
                const output = yield this.companyBusiness.getCompany(input);
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
exports.CompanyController = CompanyController;
