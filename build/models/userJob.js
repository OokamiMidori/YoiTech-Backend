"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserJob = void 0;
class UserJob {
    constructor(userId, workingStatus, salaryClaim, startUpForecast, overtimeAviability) {
        this.userId = userId;
        this.workingStatus = workingStatus;
        this.salaryClaim = salaryClaim;
        this.startUpForecast = startUpForecast;
        this.overtimeAviability = overtimeAviability;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
    getWorkingStatus() {
        return this.workingStatus;
    }
    setWorkingStatus(value) {
        this.workingStatus = value;
    }
    getSalaryClaim() {
        return this.salaryClaim;
    }
    setSalaryClaim(value) {
        this.salaryClaim = value;
    }
    getStartUpForecast() {
        return this.startUpForecast;
    }
    setStartUpForecast(value) {
        this.startUpForecast = value;
    }
    getOvertimeAviability() {
        return this.overtimeAviability;
    }
    setOvertimeAviability(value) {
        this.overtimeAviability = value;
    }
    toDBModel() {
        return {
            user_id: this.userId,
            working_status: this.workingStatus,
            salary_claim: this.salaryClaim,
            start_up_forecast: this.startUpForecast,
            overtime_availability: this.overtimeAviability
        };
    }
    toBusinessModel() {
        return {
            userId: this.userId,
            workingStatus: this.workingStatus,
            salaryClaim: this.salaryClaim,
            startUpForecast: this.startUpForecast,
            overtimeAvailability: this.overtimeAviability
        };
    }
}
exports.UserJob = UserJob;
