import { UserDetailDB, UserDetailModel } from "../Types"

export class UserDetail {
    constructor(
        private userId: string,
        private drivingLicense: number,
        private licenseTypeId: string,
        private meansOfTransport: string,
        private gradeLevel: string,
        private profissionalLicenseId: string,
        private japaneseConversationStatus: string,
        private japaneseReadingStatus: string,
        private japaneseDescentDegree: string,
        private japaneseVisaType: string,
        private japaneseChildStatus: string,
        private childNumber: number,
        private childSchoolAge: string,
        private createdAt: string
    ) { }

    public getUserId(): string {
        return this.userId
    }
    public setUserId(value: string): void {
        this.userId = value
    }

    public getByDrivingLicense(): number {
        return this.drivingLicense
    }

    public setDrivingLicense(value: number): void {
        this.drivingLicense = value
    }

    public getLicenseTypeId(): string {
        return this.licenseTypeId
    }

    public setLicenseTypeId(value: string): void {
        this.licenseTypeId = value
    }

    public getMeansOfTransport(): string {
        return this.meansOfTransport
    }

    public setMeansOfTransport(value: string) {
        this.meansOfTransport = value
    }

    public getGradeLevel() {
        return this.gradeLevel
    }

    public setGradeLevel(value: string) {
        this.gradeLevel = value
    }

    public getProfissionalLicenseId() {
        return this.profissionalLicenseId
    }

    public setProfissionalLicenseId(value: string) {
        this.profissionalLicenseId = value
    }

    public getJapaneseConversationStatus() {
        return this.japaneseConversationStatus
    }

    public setJapaneseConversationStatus(value: string) {
        this.japaneseConversationStatus = value
    }

    public getJapaneseReadingStatus() {
        return this.japaneseReadingStatus
    }

    public setJapaneseReadingStatus(value: string) {
        this.japaneseReadingStatus = value
    }

    public getJapaneseDescentDegree() {
        return this.japaneseDescentDegree
    }

    public setJapaneseDescentDegree(value: string) {
        this.japaneseDescentDegree = value
    }

    public getJapaneseVisaType() {
        return this.japaneseVisaType
    }

    public setJapaneseVisaType(value: string) {
        this.japaneseVisaType = value
    }

    public getJapaneseChildStatus() {
        return this.japaneseChildStatus
    }

    public setJapaneseChildStatus(value: string) {
        this.japaneseChildStatus = value
    }

    public getChildNumber() {
        return this.childNumber
    }

    public setChildNumber(value: number) {
        this.childNumber = value
    }

    public getChildSchoolAge() {
        return this.childSchoolAge
    }

    public setChildSchoolAge(value: string) {
        this.childSchoolAge = value
    }

    public getCreatedAt() {
        return this.createdAt
    }

    public setCreatedAt(value: string) {
        this.createdAt = value
    }

    public toDBModel(): UserDetailDB {
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
        }
    }

    public toBusinessModel(): UserDetailModel {
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
        }
    }
}