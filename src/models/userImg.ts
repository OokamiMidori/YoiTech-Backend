import { UserImgDB, UserImgModel } from "../Types"

export class UserImg {
    constructor(
        private userId: string,
        private img: string,
        private createdAt: string
    ) { }

    public getUserId(): string {
        return this.userId
    }

    public setUserId(value: string): void {
        this.userId = value
    }

    public getImg(): string {
        return this.img
    }

    public setImg(value: string): void {
        this.img = value
    }

    public getCreatedAt ():string {
        return this.createdAt
    }

    public setCreatedAt(value:string):void{
        this.createdAt = value
    }

    public toDBModel ():UserImgDB {
        return{
            user_id:this.userId,
            img:this.img,
            created_at:this.createdAt
        }
    }

    public toBusinessModel():UserImgModel{
        return{
            userId:this.userId,
            img:this.img,
            createdAt:this.createdAt
        }
    }
}