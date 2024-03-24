import { CompanyDB, CompanyModel, EMAIL_STATUS, STATUS_USER_COMPANY, USER_ROLES } from "../Types";

export class Company{
    constructor(
        private id:string,
        private responsableCompanyName:string,
        private email:string,
        private password:string,
        private phoneNumber:string,
        private cellPhoneNumber:string,
        private role:USER_ROLES,
        private status:STATUS_USER_COMPANY,
        private emailStatus:EMAIL_STATUS,
        private createdAt:string
    ){}

    public getId():string{
        return this.id
    }

    public setId(value:string):void{
        this.id = value
    }

    public getResponsableCompanyName():string{
        return this.responsableCompanyName
    }

    public setResponsableCompanyName(value:string):void{
        this.responsableCompanyName = value
    }

    public getEmail():string{
        return this.email
    }

    public setEmail(value:string):void{
        this.email = value
    }

    public getPassword():string{
        return this.password
    }

    public setPassword(value:string):void{
        this.password = value
    }

    public getPhoneNumber():string{
        return this.phoneNumber
    }

    public setPhoneNumber(value:string):void{
        this.phoneNumber = value
    }

    public getCellPhoneNumber():string{
        return this.cellPhoneNumber
    }

    public setCellPhoneNumber(value:string):void{
        this.cellPhoneNumber = value
    }

    public getRole():USER_ROLES{
        return this.role
    }

    public setRole(value:USER_ROLES):void{
        this.role = value
    }

    public getStatus():STATUS_USER_COMPANY{
        return this.status
    }

    public setStatus(value:STATUS_USER_COMPANY):void{
        this.status = value
    }

    public getEmailStatus():EMAIL_STATUS{
        return this.emailStatus
    }

    public setEmailStatus(value:EMAIL_STATUS):void{
        this.emailStatus = value
    }

    public getCreatedAt():string{
        return this.createdAt
    }

    public setCreatedAt(value:string):void{
        this.createdAt = value
    }

    public toDBModel():CompanyDB{
        return{
            id:this.id,
            responsible_company_name:this.responsableCompanyName,
            email:this.email,
            password:this.password,
            phone_number:this.phoneNumber,
            cell_phone_number:this.cellPhoneNumber,
            role:this.role,
            status:this.status,
            email_status:this.emailStatus,
            created_at:this.createdAt
        }
    }

    public toBusinessModel():CompanyModel{
        return{
            id:this.id,
            responsableCompanyName:this.responsableCompanyName,
            email:this.email,
            password:this.password,
            phoneNumber:this.phoneNumber,
            cellPhoneNumber:this.cellPhoneNumber,
            role:this.role,
            status:this.status,
            emailStatus:this.emailStatus,
            createdAt:this.createdAt
        }
    }
}