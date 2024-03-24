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
exports.UserDetailBusiness = void 0;
const TokenManager_1 = require("../services/TokenManager");
const BadRequestError_1 = require("../errors/BadRequestError");
const userDetail_1 = require("../models/userDetail");
class UserDetailBusiness {
    constructor(userDataBase, userDetailDatabase, tokenManager) {
        this.userDataBase = userDataBase;
        this.userDetailDatabase = userDetailDatabase;
        this.tokenManager = tokenManager;
        this.createUserDetails = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, userId, drivingLicense, licenseTypeId, meansOfTransport, gradeLevel, profissionalLicenseId, japaneseConversationStatus, japaneseReadingStatus, japaneseDescentDegree, japaneseVisaType, japaneseChildStatus, childNumber, childSchoolAge } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof userId !== "string") {
                throw new BadRequestError_1.BadRequestError("'UserId' deve ser string");
            }
            if (typeof drivingLicense !== "number") {
                throw new BadRequestError_1.BadRequestError("'drivingLicense' deve ser string");
            }
            if (typeof licenseTypeId !== "string") {
                throw new BadRequestError_1.BadRequestError("'licenseTypeId' deve ser string");
            }
            if (typeof meansOfTransport !== "string") {
                throw new BadRequestError_1.BadRequestError("'meansOfTransport' deve ser string");
            }
            if (typeof gradeLevel !== "string") {
                throw new BadRequestError_1.BadRequestError("'gradeLevel' deve ser string");
            }
            if (typeof profissionalLicenseId !== "string") {
                throw new BadRequestError_1.BadRequestError("'profissionalLicenseId' deve ser string");
            }
            if (typeof japaneseConversationStatus !== "string") {
                throw new BadRequestError_1.BadRequestError("'japaneseConversationStatus' deve ser string");
            }
            if (typeof japaneseReadingStatus !== "string") {
                throw new BadRequestError_1.BadRequestError("'japaneseReadingStatus' deve ser string");
            }
            if (typeof japaneseDescentDegree !== "string") {
                throw new BadRequestError_1.BadRequestError("'japaneseDescentDegree' deve ser string");
            }
            if (typeof japaneseVisaType !== "string") {
                throw new BadRequestError_1.BadRequestError("'japaneseVisaType' deve ser string");
            }
            if (typeof japaneseChildStatus !== "string") {
                throw new BadRequestError_1.BadRequestError("'japaneseChildStatus' deve ser string");
            }
            if (typeof childNumber !== "number") {
                throw new BadRequestError_1.BadRequestError("'childNumber' deve ser number");
            }
            if (typeof childSchoolAge !== "string") {
                throw new BadRequestError_1.BadRequestError("'childSchoolAge' deve ser string");
            }
            const UserDB = yield this.userDataBase.findById(userId);
            if (!UserDB) {
                throw new BadRequestError_1.BadRequestError("'UserId' inválido");
            }
            const createdAt = new Date().toISOString();
            const newUserDetail = new userDetail_1.UserDetail(userId, drivingLicense, licenseTypeId, meansOfTransport, gradeLevel, profissionalLicenseId, japaneseConversationStatus, japaneseReadingStatus, japaneseDescentDegree, japaneseVisaType, japaneseChildStatus, childNumber, childSchoolAge, createdAt);
            const userDetailDB = newUserDetail.toDBModel();
            yield this.userDetailDatabase.insert(userDetailDB);
        });
        this.getUserDetail = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const idBuscado = payload.id;
            const userDetailDB = yield this.userDetailDatabase.findByid(idBuscado);
            if (!userDetailDB) {
                throw new BadRequestError_1.BadRequestError("UserDetail não cadastrado");
            }
            const userDetail = new userDetail_1.UserDetail(userDetailDB.user_id, userDetailDB.driving_license, userDetailDB.license_type_id, userDetailDB.means_of_transport, userDetailDB.grade_level, userDetailDB.profissional_license_id, userDetailDB.japanese_conversation_status, userDetailDB.japanese_reading_status, userDetailDB.japanese_descent_degree, userDetailDB.japanese_visa_type, userDetailDB.japanese_child_status, userDetailDB.child_number, userDetailDB.child_school_age, userDetailDB.created_at);
            const userDetailModel = userDetail.toBusinessModel();
            return userDetailModel;
        });
        this.deletUserDetail = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const idBuscado = payload.id;
            const userDetailDB = yield this.userDetailDatabase.findByid(idBuscado);
            if (!userDetailDB) {
                throw new BadRequestError_1.BadRequestError("UserDetail não cadastrado");
            }
            yield this.userDetailDatabase.delete(payload.id);
        });
        this.editUserDetail = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, userId, drivingLicense, licenseTypeId, meansOfTransport, gradeLevel, profissionalLicenseId, japaneseConversationStatus, japaneseReadingStatus, japaneseDescentDegree, japaneseVisaType, japaneseChildStatus, childNumber, childSchoolAge } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof userId !== "string") {
                throw new BadRequestError_1.BadRequestError("'UserId' deve ser string");
            }
            if (typeof drivingLicense !== "number") {
                throw new BadRequestError_1.BadRequestError("'drivingLicense' deve ser string");
            }
            if (typeof licenseTypeId !== "string") {
                throw new BadRequestError_1.BadRequestError("'licenseTypeId' deve ser string");
            }
            if (typeof meansOfTransport !== "string") {
                throw new BadRequestError_1.BadRequestError("'meansOfTransport' deve ser string");
            }
            if (typeof gradeLevel !== "string") {
                throw new BadRequestError_1.BadRequestError("'gradeLevel' deve ser string");
            }
            if (typeof profissionalLicenseId !== "string") {
                throw new BadRequestError_1.BadRequestError("'profissionalLicenseId' deve ser string");
            }
            if (typeof japaneseConversationStatus !== "string") {
                throw new BadRequestError_1.BadRequestError("'japaneseConversationStatus' deve ser string");
            }
            if (typeof japaneseReadingStatus !== "string") {
                throw new BadRequestError_1.BadRequestError("'japaneseReadingStatus' deve ser string");
            }
            if (typeof japaneseDescentDegree !== "string") {
                throw new BadRequestError_1.BadRequestError("'japaneseDescentDegree' deve ser string");
            }
            if (typeof japaneseVisaType !== "string") {
                throw new BadRequestError_1.BadRequestError("'japaneseVisaType' deve ser string");
            }
            if (typeof japaneseChildStatus !== "string") {
                throw new BadRequestError_1.BadRequestError("'japaneseChildStatus' deve ser string");
            }
            if (typeof childNumber !== "number") {
                throw new BadRequestError_1.BadRequestError("'childNumber' deve ser number");
            }
            if (typeof childSchoolAge !== "string") {
                throw new BadRequestError_1.BadRequestError("'childSchoolAge' deve ser string");
            }
            if (payload.role !== TokenManager_1.USER_ROLES.ADMIN && payload.id !== userId) {
                throw new BadRequestError_1.BadRequestError("Somente o usuário que criou ou um usuário ADM pode editar esse item");
            }
            const userDetailDB = yield this.userDetailDatabase.findByid(userId);
            if (!userDetailDB) {
                throw new BadRequestError_1.BadRequestError("UserDetail não existe.");
            }
            const createdAt = new Date().toISOString();
            const userDetail = new userDetail_1.UserDetail(userId, drivingLicense, licenseTypeId, meansOfTransport, gradeLevel, profissionalLicenseId, japaneseConversationStatus, japaneseReadingStatus, japaneseDescentDegree, japaneseVisaType, japaneseChildStatus, childNumber, childSchoolAge, createdAt);
            const userDetailEditadoDB = userDetail.toDBModel();
            yield this.userDetailDatabase.update(userId, userDetailEditadoDB);
        });
    }
}
exports.UserDetailBusiness = UserDetailBusiness;
