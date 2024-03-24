import { APPLICATION_STATUS, JobApplicationDB, JobApplicationModel } from "../Types";

export class JobApplication{
    constructor(
        private id:string,
        private jobOpportunityId:string,
        private userId:string,
        private status:APPLICATION_STATUS,
        private createdAt:string
    ){}

    public getId():string{
        return this.id
    }

    public setid (value:string):void{
        this.id = value
    }

    public getJobOpportunityId():string{
        return this.jobOpportunityId
    }

    public setJobOpportunityId (value:string):void{
        this.jobOpportunityId = value
    }

    public getUserId():string{
        return this.userId
    }

    public setUserId (value:string):void{
        this.userId = value
    }

    public getStatus():APPLICATION_STATUS{
        return this.status
    }

    public setStatus (value:APPLICATION_STATUS):void{
        this.status = value
    }

    public getcreateAt():string{
        return this.createdAt
    }

    public setCreatedAt (value:string):void{
        this.createdAt = value
    }

    public toDBModel ():JobApplicationDB{
        return{
            id:this.id,
            job_opportunity_id:this.jobOpportunityId,
            user_id:this.userId,
            status:this.status,
            created_at:this.createdAt
        }
    }

    public toBusinessModel():JobApplicationModel{
        return{
            id:this.id,
            jobOpportunityId:this.jobOpportunityId,
            userId:this.userId,
            status:this.status,
            createdAt:this.createdAt
        }
    }



}