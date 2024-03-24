import { MessageDB, MessageModel } from "../Types"

export class Message{
    constructor(
        private id:string,
        private creatorId:string,
        private companyId:string,
        private userId:string,
        private content:string,
        private createdAt:string
    ){}

    public getId ():string{
        return this.id
    }

    public setId (value:string):void{
        this.id = value
    }

    public getCreatorId ():string{
        return this.creatorId
    }

    public setCreatorId(value:string):void{
        this.creatorId = value
    }

    public getCompanyId ():string{
        return this.companyId
    }

    public setCompanyId (value:string):void{
        this.companyId = value
    }

    public getuserId ():string{
        return this.userId
    }

    public setuserId (value:string):void{
        this.userId = value
    }

    public getContent ():string{
        return this.content
    }

    public setContent (value:string):void{
        this.content = value
    }

    public getCreatedAt ():string{
        return this.createdAt
    }

    public setCreatedAt (value:string):void{
        this.createdAt = value
    }

    public toDBModel ():MessageDB{
        return{
            id:this.id,
            creator_id:this.creatorId,
            company_id:this.companyId,
            user_id:this.userId,
            content:this.content,
            created_at:this.createdAt
        }
    }

    public toBusinessModel():MessageModel{
        return{
            id:this.id,
            creatorId:this.creatorId,
            companyId:this.companyId,
            userId:this.userId,
            content:this.content,
            createdAt:this.createdAt
        }
    }
}