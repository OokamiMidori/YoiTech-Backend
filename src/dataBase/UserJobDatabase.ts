import { UserJobDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class UserJobDatabase extends BaseDatabase {
    public static TABLE_USER_JOB = "user_job"

    public findById = async (id:string):Promise<UserJobDB>=>{
        const result:UserJobDB[] = await BaseDatabase.connection(UserJobDatabase.TABLE_USER_JOB)
        .select()
        .where("user_job.user_id",id)

        return result[0]
    }

    public insert = async(userJobDB:UserJobDB):Promise<void>=>{
        await BaseDatabase.connection(UserJobDatabase.TABLE_USER_JOB)
        .insert(userJobDB)

    }

    public delete = async (id:string):Promise<void>=>{
        await BaseDatabase.connection(UserJobDatabase.TABLE_USER_JOB)
        .delete()
        .where("user_job.user_id",id)

    }

    public update = async(id:string, userJobDB:UserJobDB):Promise<void>=>{
        await BaseDatabase.connection(UserJobDatabase.TABLE_USER_JOB)
        .update(userJobDB)
        .where("user_job.user_id",id)
    }
}