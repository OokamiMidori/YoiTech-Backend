"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplication = void 0;
class JobApplication {
    constructor(id, jobOpportunityId, userId, status, createdAt) {
        this.id = id;
        this.jobOpportunityId = jobOpportunityId;
        this.userId = userId;
        this.status = status;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    setid(value) {
        this.id = value;
    }
    getJobOpportunityId() {
        return this.jobOpportunityId;
    }
    setJobOpportunityId(value) {
        this.jobOpportunityId = value;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
    getStatus() {
        return this.status;
    }
    setStatus(value) {
        this.status = value;
    }
    getcreateAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    toDBModel() {
        return {
            id: this.id,
            job_opportunity_id: this.jobOpportunityId,
            user_id: this.userId,
            status: this.status,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            jobOpportunityId: this.jobOpportunityId,
            userId: this.userId,
            status: this.status,
            createdAt: this.createdAt
        };
    }
}
exports.JobApplication = JobApplication;
