import { CompanyLogoDB, CompanyLogoModel } from "../Types"

export class CompanyLogo{
    constructor(
        private id:string,
        private companyId:string,
        private logoImg:string,
        private createdAt:string
    ){}

    public getId ():string{
        return this.id
    }

    public setId (value:string):void{
        this.id = value
    }

    public getCompanyId():string{
        return this.companyId
    }

    public setCompanyId(value:string):void{
        this.companyId = value
    }

    public getLogoImg():string{
        return this.logoImg
    }

    public setLogoImg(value:string):void{
        this.logoImg = value
    }

    public getCreatedAt():string{
        return this.createdAt
    }

    public setCreatedAt(value:string):void{
        this.createdAt = value
    }

    public toDBModel():CompanyLogoDB{
        return{
            id:this.id,
            company_id:this.companyId,
            logo_img:this.logoImg,
            created_at:this.createdAt
        }
    }

    public toBusinessModel():CompanyLogoModel{
        return{
            id:this.id,
            companyId:this.companyId,
            logoImg:this.logoImg,
            createdAt:this.createdAt
        }
    }
}