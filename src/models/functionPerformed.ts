import { FunctionPerformedDB, FunctionPerformedModel } from "../Types"

export class FunctionPerformed {
    constructor(
       private id:string,
       private lineOfBusinessId:string,
       private content:string,
       private createdAt:string
    ){}

    public getId(): string {
        return this.id
    }

    public setId(value:string) :void{
        this.id = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value:string):void{
        this.content = value
    }

    public getCreatedAt(): string {
       return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public getLineOfBusinessId(): string{
        return this.lineOfBusinessId
    }

    public setLineOfBusinessId(value: string): void {
        this.lineOfBusinessId = value
    }

    public toDBModel(): FunctionPerformedDB{
        return{
            id:this.id,
            line_of_business_id:this.lineOfBusinessId,
            content:this.content,
            created_at:this.createdAt
        }
    }

    public toBusinessModel (): FunctionPerformedModel{
        return{
            id:this.id,
            lineOfBusines:this.lineOfBusinessId,
            content:this.content,
            createdAt:this.createdAt
        }
    }
    
}