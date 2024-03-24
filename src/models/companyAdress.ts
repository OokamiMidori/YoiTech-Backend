import { CompanyAdressDB, CompanyAdressModel } from "../Types";

export class CompanyAdress{
    constructor(
        private id:string,
        private companyId:string,
        private cep:string,
        private city:string,
        private neighborhood:string,
        private apartment:string,
        private createdAt:string
    ){}

    public toDBModel():CompanyAdressDB{
        return{
            id:this.id,
            company_id:this.companyId,
            cep:this.cep,
            city:this.city,
            neighborhood:this.neighborhood,
            apartment:this.apartment,
            created_at:this.createdAt
        }
    }

    public toBusinessModel():CompanyAdressModel{
        return{
            id:this.id,
            companyId:this.companyId,
            cep:this.cep,
            city:this.city,
            neighborhood:this.neighborhood,
            apartment:this.apartment,
            createdAt:this.createdAt
        }
    }
}