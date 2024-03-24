import { UserJobDB, UserJobModel } from "../Types"

export class UserJob {
    constructor(
        private userId: string,
        private workingStatus: string,
        private salaryClaim: string,
        private startUpForecast: string,
        private overtimeAviability: string
    ) { }

    public getUserId(): string {
        return this.userId
    }

    public setUserId(value: string): void {
        this.userId = value
    }

    public getWorkingStatus(): string {
        return this.workingStatus
    }

    public setWorkingStatus(value: string): void {
        this.workingStatus = value
    }

    public getSalaryClaim(): string {
        return this.salaryClaim
    }

    public setSalaryClaim(value: string): void {
        this.salaryClaim = value
    }

    public getStartUpForecast(): string {
        return this.startUpForecast
    }

    public setStartUpForecast(value: string): void {
        this.startUpForecast = value
    }

    public getOvertimeAviability(): string {
        return this.overtimeAviability
    }

    public setOvertimeAviability(value: string): void {
        this.overtimeAviability = value
    }

    public toDBModel ():UserJobDB{
        return{
            user_id:this.userId,
            working_status:this.workingStatus,
            salary_claim:this.salaryClaim,
            start_up_forecast:this.startUpForecast,
            overtime_availability:this.overtimeAviability
        }
    }

    public toBusinessModel ():UserJobModel{
        return{
            userId:this.userId,
            workingStatus:this.workingStatus,
            salaryClaim:this.salaryClaim,
            startUpForecast:this.startUpForecast,
            overtimeAvailability:this.overtimeAviability
        }
    }
}