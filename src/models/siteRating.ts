import { SiteRatingDB, SiteRatingModel } from "../Types";

export class SiteRating{
    constructor(
        private id:string,
        private companyId:string,
        private rating:number,
        private message:string,
        private createdAt:string
    ){}

    public toDBModel():SiteRatingDB{
        return{
            id:this.id,
            company_id:this.companyId,
            rating:this.rating,
            message:this.message,
            created_at:this.createdAt
        }
    }

    public toBusinessModel():SiteRatingModel{
        return{
            id:this.id,
            companyId:this.companyId,
            rating:this.rating,
            message:this.message,
            createdAt:this.createdAt
        }
    }
}