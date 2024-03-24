import { UserImgDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class UserImgDatabase extends BaseDatabase {
    public static TABLE_USER_IMG = "user_img"

    public insert = async (userImgDB:UserImgDB):Promise<void>=>{
        await BaseDatabase.connection(UserImgDatabase.TABLE_USER_IMG)
        .insert(userImgDB)

    }

    public findById = async(id:string):Promise<UserImgDB>=>{{
        const result:UserImgDB[] = await BaseDatabase.connection(UserImgDatabase.TABLE_USER_IMG)
        .select()
        .where("user_img.user_id", id)

        return result[0]
    }}

    public delete = async (id:string):Promise<void>=>{
        await BaseDatabase.connection(UserImgDatabase.TABLE_USER_IMG).delete()
        .where("user_img.user_id", id)
    }

    public update = async(id:string, userImgDB:UserImgDB):Promise<void>=>{
        await BaseDatabase.connection(UserImgDatabase.TABLE_USER_IMG)
        .update(userImgDB)
        .where("user_img.user_id", id)
    }
}