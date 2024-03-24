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
exports.UserDetailController = void 0;
const BaseError_1 = require("../errors/BaseError");
class UserDetailController {
    constructor(userDetailBusiness) {
        this.userDetailBusiness = userDetailBusiness;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    userId: req.body.userId,
                    drivingLicense: req.body.drivingLicense,
                    licenseTypeId: req.body.licenseTypeId,
                    meansOfTransport: req.body.meansOfTransport,
                    gradeLevel: req.body.gradeLevel,
                    profissionalLicenseId: req.body.profissionalLicenseId,
                    japaneseConversationStatus: req.body.japaneseConversationStatus,
                    japaneseReadingStatus: req.body.japaneseReadingStatus,
                    japaneseDescentDegree: req.body.japaneseDescentDegree,
                    japaneseVisaType: req.body.japaneseVisaType,
                    japaneseChildStatus: req.body.japaneseChildStatus,
                    childNumber: req.body.childNumber,
                    childSchoolAge: req.body.childSchoolAge
                };
                yield this.userDetailBusiness.createUserDetails(input);
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
                    userId: req.body.userId,
                    drivingLicense: req.body.drivingLicense,
                    licenseTypeId: req.body.licenseTypeId,
                    meansOfTransport: req.body.meansOfTransport,
                    gradeLevel: req.body.gradeLevel,
                    profissionalLicenseId: req.body.profissionalLicenseId,
                    japaneseConversationStatus: req.body.japaneseConversationStatus,
                    japaneseReadingStatus: req.body.japaneseReadingStatus,
                    japaneseDescentDegree: req.body.japaneseDescentDegree,
                    japaneseVisaType: req.body.japaneseVisaType,
                    japaneseChildStatus: req.body.japaneseChildStatus,
                    childNumber: req.body.childNumber,
                    childSchoolAge: req.body.childSchoolAge
                };
                yield this.userDetailBusiness.editUserDetail(input);
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
                    token: req.headers.authorization
                };
                yield this.userDetailBusiness.deletUserDetail(input);
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
                const output = yield this.userDetailBusiness.getUserDetail(input);
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
exports.UserDetailController = UserDetailController;
