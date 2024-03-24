import { DrivingLicenseTypeDB, DrivingLicenseTypeModel } from "../Types"

export class DrivingLicenseType{
    constructor(
        private id:string,
        private content:string,
        private createdAt:string
    ){}

    public getId():string{
        return this.id
    }
    public setId(value:string):void{
        this.id = value
    }

    public getContent():string{
        return this.content
    }

    public setContent(value:string):void{
        this.content = value
    }

    public getCreatedAt():string{
        return this.createdAt
    }

    public setCreatedAt(value:string):void{
        this.createdAt = value
    }

    public toDBModel():DrivingLicenseTypeDB{
        return{
            id:this.id,
            content:this.content,
            created_at:this.createdAt
        }
    }

    public toBusinessModel():DrivingLicenseTypeModel{
        return{
            id:this.id,
            content:this.content,
            createdAt:this.createdAt
        }
    }
}