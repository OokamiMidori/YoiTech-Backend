import { UserDetailDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDetailDatabase extends BaseDatabase {
    public static TABLE_USER_DETAIL = "user_detail"

    public insert = async (userDetailDB:UserDetailDB):Promise<void>=>{
        await BaseDatabase.connection(UserDetailDatabase.TABLE_USER_DETAIL)
        .insert(userDetailDB)

    }

    public findByid = async (id:string):Promise<UserDetailDB>=>{
        const result:UserDetailDB[] = await BaseDatabase.connection(UserDetailDatabase.TABLE_USER_DETAIL)
        .select()
        .where("user_detail", id)

        return result[0]
    }

    public delete = async (userId:string):Promise<void>=>{
        await BaseDatabase.connection(UserDetailDatabase.TABLE_USER_DETAIL)
        .delete()
        .where( {user_id:userId})
    }

    public update = async(userId:string, userDetailDB:UserDetailDB):Promise<void>=>{
        await BaseDatabase.connection(UserDetailDatabase.TABLE_USER_DETAIL)
        .update(userDetailDB)
        .where({user_id:userId})
    }
}