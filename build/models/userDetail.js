"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetail = void 0;
class UserDetail {
    constructor(userId, drivingLicense, licenseTypeId, meansOfTransport, gradeLevel, profissionalLicenseId, japaneseConversationStatus, japaneseReadingStatus, japaneseDescentDegree, japaneseVisaType, japaneseChildStatus, childNumber, childSchoolAge, createdAt) {
        this.userId = userId;
        this.drivingLicense = drivingLicense;
        this.licenseTypeId = licenseTypeId;
        this.meansOfTransport = meansOfTransport;
        this.gradeLevel = gradeLevel;
        this.profissionalLicenseId = profissionalLicenseId;
        this.japaneseConversationStatus = japaneseConversationStatus;
        this.japaneseReadingStatus = japaneseReadingStatus;
        this.japaneseDescentDegree = japaneseDescentDegree;
        this.japaneseVisaType = japaneseVisaType;
        this.japaneseChildStatus = japaneseChildStatus;
        this.childNumber = childNumber;
        this.childSchoolAge = childSchoolAge;
        this.createdAt = createdAt;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
    getByDrivingLicense() {
        return this.drivingLicense;
    }
    setDrivingLicense(value) {
        this.drivingLicense = value;
    }
    getLicenseTypeId() {
        return this.licenseTypeId;
    }
    setLicenseTypeId(value) {
        this.licenseTypeId = value;
    }
    getMeansOfTransport() {
        return this.meansOfTransport;
    }
    setMeansOfTransport(value) {
        this.meansOfTransport = value;
    }
    getGradeLevel() {
        return this.gradeLevel;
    }
    setGradeLevel(value) {
        this.gradeLevel = value;
    }
    getProfissionalLicenseId() {
        return this.profissionalLicenseId;
    }
    setProfissionalLicenseId(value) {
        this.profissionalLicenseId = value;
    }
    getJapaneseConversationStatus() {
        return this.japaneseConversationStatus;
    }
    setJapaneseConversationStatus(value) {
        this.japaneseConversationStatus = value;
    }
    getJapaneseReadingStatus() {
        return this.japaneseReadingStatus;
    }
    setJapaneseReadingStatus(value) {
        this.japaneseReadingStatus = value;
    }
    getJapaneseDescentDegree() {
        return this.japaneseDescentDegree;
    }
    setJapaneseDescentDegree(value) {
        this.japaneseDescentDegree = value;
    }
    getJapaneseVisaType() {
        return this.japaneseVisaType;
    }
    setJapaneseVisaType(value) {
        this.japaneseVisaType = value;
    }
    getJapaneseChildStatus() {
        return this.japaneseChildStatus;
    }
    setJapaneseChildStatus(value) {
        this.japaneseChildStatus = value;
    }
    getChildNumber() {
        return this.childNumber;
    }
    setChildNumber(value) {
        this.childNumber = value;
    }
    getChildSchoolAge() {
        return this.childSchoolAge;
    }
    setChildSchoolAge(value) {
        this.childSchoolAge = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    toDBModel() {
        return {
            user_id: this.userId,
            driving_license: this.drivingLicense,
            license_type_id: this.licenseTypeId,
            means_of_transport: this.meansOfTransport,
            grade_level: this.gradeLevel,
            profissional_license_id: this.profissionalLicenseId,
            japanese_conversation_status: this.japaneseConversationStatus,
            japanese_reading_status: this.japaneseReadingStatus,
            japanese_descent_degree: this.japaneseDescentDegree,
            japanese_visa_type: this.japaneseVisaType,
            japanese_child_status: this.japaneseChildStatus,
            child_number: this.childNumber,
            child_school_age: this.childSchoolAge,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            userId: this.userId,
            drivingLicense: this.drivingLicense,
            licenseTypeId: this.licenseTypeId,
            meansOfTransport: this.meansOfTransport,
            gradeLevel: this.gradeLevel,
            profissionalLicenseId: this.profissionalLicenseId,
            japaneseConversationStatus: this.japaneseConversationStatus,
            japaneseReadingStatus: this.japaneseReadingStatus,
            japaneseDescentDegree: this.japaneseDescentDegree,
            japaneseVisaType: this.japaneseVisaType,
            japaneseChildStatus: this.japaneseChildStatus,
            childNumber: this.childNumber,
            childSchoolAge: this.childSchoolAge,
            createdAt: this.createdAt
        };
    }
}
exports.UserDetail = UserDetail;
