import { WorkHistoryDB, WorkHistoryModel } from "../Types"

export class WorkHisotry {
    constructor(
        private id: string,
        private userId: string,
        private companyName: string,
        private factoryName: string,
        private stateProvince: string,
        private lineOfBusiness: string,
        private startTime: string,
        private endTime: string,
        private functionPerformedId: string,
        private reasonTermination: string,
        private createdAt: string
    ) { }

    public getId(): string {
        return this.id
    }
    public setId(value: string): void {
        this.id = value
    }
    public getUserId(): string {
        return this.userId
    }
    public setUserId(value: string): void {
        this.userId = value
    }
    public getCompanyName(): string {
        return this.companyName
    }
    public setCompanyName(value: string) {
        this.companyName = value
    }
    public getFactoryName(): string {
        return this.factoryName
    }
    public setFactoryName(value: string): void {
        this.factoryName = value
    }
    public getStateProvince(): string {
        return this.stateProvince
    }
    public setStateProvince(value: string) {
        this.stateProvince = value
    }
    public getLineOfBusiness(): string {
        return this.lineOfBusiness
    }
    public setLineOfBusiness(value: string): void {
        this.lineOfBusiness = value
    }
    public getStartTime(): string {
        return this.startTime
    }
    public setStartTime(value: string): void {
        this.startTime = value
    }
    public getEndTime(): string {
        return this.endTime
    }
    public setEndTime(value: string): void {
        this.endTime = value
    }
    public getFunctionPerformedID(): string {
        return this.functionPerformedId
    }
    public setFunctionPerformedId(value: string): void {
        this.functionPerformedId = value
    }
    public getReasonTermination(): string {
        return this.reasonTermination
    }
    public setReasonTermination(value: string): void {
        this.reasonTermination = value
    }
    public getCreatedAt(): string {
        return this.createdAt
    }
    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public toDBModel(): WorkHistoryDB {
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
        }
    }

    public toBusinessModel(): WorkHistoryModel {
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
        }
    }
}