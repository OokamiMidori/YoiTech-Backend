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
exports.DrivingLicenseTypeBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const drivingLicenseType_1 = require("../models/drivingLicenseType");
class DrivingLicenseTypeBusiness {
    constructor(drivingLicenseDatabase, tokenManager, idGenerator, hashManager) {
        this.drivingLicenseDatabase = drivingLicenseDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.createDrivingLicenseType = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, content } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (content !== "string") {
                throw new BadRequestError_1.BadRequestError("'content' dever ser string");
            }
            const drivingLicenseOk = yield this.drivingLicenseDatabase.getByContent(content);
            if (drivingLicenseOk) {
                throw new BadRequestError_1.BadRequestError("Item já existente");
            }
            const id = this.idGenerator.generate();
            const createdAt = new Date().toISOString();
            const newDrivingLicenseType = new drivingLicenseType_1.DrivingLicenseType(id, content, createdAt);
            const DrivingLicenseTypeDB = newDrivingLicenseType.toDBModel();
            yield this.drivingLicenseDatabase.insert(DrivingLicenseTypeDB);
        });
        this.getDrivingLicenseType = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const drivingLicenseTypeDB = yield this.drivingLicenseDatabase.getAll();
            const DrivingLicenseTypeModel = drivingLicenseTypeDB.map((drivingLicenseTypeDB) => {
                const drivingLicenseType = new drivingLicenseType_1.DrivingLicenseType(drivingLicenseTypeDB.id, drivingLicenseTypeDB.content, drivingLicenseTypeDB.created_at);
                return drivingLicenseType.toBusinessModel();
            });
            return DrivingLicenseTypeModel;
        });
    }
}
exports.DrivingLicenseTypeBusiness = DrivingLicenseTypeBusiness;
