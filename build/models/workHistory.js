"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkHisotry = void 0;
class WorkHisotry {
    constructor(id, userId, companyName, factoryName, stateProvince, lineOfBusiness, startTime, endTime, functionPerformedId, reasonTermination, createdAt) {
        this.id = id;
        this.userId = userId;
        this.companyName = companyName;
        this.factoryName = factoryName;
        this.stateProvince = stateProvince;
        this.lineOfBusiness = lineOfBusiness;
        this.startTime = startTime;
        this.endTime = endTime;
        this.functionPerformedId = functionPerformedId;
        this.reasonTermination = reasonTermination;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
    getCompanyName() {
        return this.companyName;
    }
    setCompanyName(value) {
        this.companyName = value;
    }
    getFactoryName() {
        return this.factoryName;
    }
    setFactoryName(value) {
        this.factoryName = value;
    }
    getStateProvince() {
        return this.stateProvince;
    }
    setStateProvince(value) {
        this.stateProvince = value;
    }
    getLineOfBusiness() {
        return this.lineOfBusiness;
    }
    setLineOfBusiness(value) {
        this.lineOfBusiness = value;
    }
    getStartTime() {
        return this.startTime;
    }
    setStartTime(value) {
        this.startTime = value;
    }
    getEndTime() {
        return this.endTime;
    }
    setEndTime(value) {
        this.endTime = value;
    }
    getFunctionPerformedID() {
        return this.functionPerformedId;
    }
    setFunctionPerformedId(value) {
        this.functionPerformedId = value;
    }
    getReasonTermination() {
        return this.reasonTermination;
    }
    setReasonTermination(value) {
        this.reasonTermination = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    toDBModel() {
        return {
            id: this.id,
            user_id: this.userId,
            company_name: this.companyName,
            factory_name: this.factoryName,
            state_province: this.stateProvince,
            line_of_business: this.lineOfBusiness,
            start_time: this.startTime,
            end_time: this.endTime,
            function_performed_id: this.functionPerformedId,
            reason_termination: this.reasonTermination,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            userId: this.userId,
            companyName: this.companyName,
            factoryName: this.factoryName,
            stateProvince: this.stateProvince,
            lineOfBusiness: this.lineOfBusiness,
            startTime: this.startTime,
            endTime: this.endTime,
            functionPerformedId: this.functionPerformedId,
            reasonTermination: this.reasonTermination,
            createdAt: this.createdAt
        };
    }
}
exports.WorkHisotry = WorkHisotry;
