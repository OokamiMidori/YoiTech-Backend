import { RatingCompanyDB, RatingCompanyModel } from "../Types";

export class RatingCompany{
    constructor(
        private id:string,
        private applicationId:string,
        private rating:number,
        private message:string,
        private createdAt:string
    ){}

    public toDBModel():RatingCompanyDB{
        return {
            id:this.id,
            application_id:this.applicationId,
            rating:this.rating,
            message:this.message,
            created_at:this.createdAt
        }
    }

    public toBusinessModel():RatingCompanyModel{
        return{
            id:this.id,
            applicationId:this.applicationId,
            rating:this.rating,
            message:this.message,
            createdAt:this.createdAt
        }
    }
}