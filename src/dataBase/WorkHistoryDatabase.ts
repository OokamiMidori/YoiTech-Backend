import { WorkHistoryDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class WorkHistoryDatabase extends BaseDatabase {
    public static TABLE_WORK_HISTORY = "work_history"

    public insert = async(workyHistoryDB:WorkHistoryDB):Promise<void>=>{
        await BaseDatabase.connection(WorkHistoryDatabase.TABLE_WORK_HISTORY)
        .insert(workyHistoryDB)
    }

    public getById = async (id:string):Promise<WorkHistoryDB>=>{
        const result:WorkHistoryDB[] = await BaseDatabase.connection(WorkHistoryDatabase.TABLE_WORK_HISTORY)
        .select()
        .where({id})

        return result[0]
    }

    public getByUserId = async (id:string):Promise<WorkHistoryDB[]>=>{
        const result:WorkHistoryDB[] = await BaseDatabase.connection(WorkHistoryDatabase.TABLE_WORK_HISTORY)
        .select()
        .where("work_history.user_id", id)

        return result
    }

    public delete = async (id:string):Promise<void>=>{
        await BaseDatabase.connection(WorkHistoryDatabase.TABLE_WORK_HISTORY)
        .delete()
        .where({id})
    }

    public update =async (id:string, workyHistoryDB:WorkHistoryDB):Promise<void> => {
        await BaseDatabase.connection(WorkHistoryDatabase.TABLE_WORK_HISTORY)
        .update(workyHistoryDB)
        .where({id})
   
    }

    
}