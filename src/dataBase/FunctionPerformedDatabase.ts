import { FunctionPerformedDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class FunctionPerformedDatabase extends BaseDatabase {
    public static TABLE_FUNCTION_PERFORMED = "function_performed"

    public insert = async (functionPerformedDB: FunctionPerformedDB): Promise<void> => {
        await BaseDatabase.connection(FunctionPerformedDatabase.TABLE_FUNCTION_PERFORMED)
            .insert(functionPerformedDB)
    }

    public getById = async (id: string): Promise<FunctionPerformedDB | undefined> => {
        const result: FunctionPerformedDB[] = await BaseDatabase.connection(FunctionPerformedDatabase.TABLE_FUNCTION_PERFORMED)
            .select()
            .where({ id })

        return result[0]
    }

    public getAll = async (): Promise<FunctionPerformedDB[]> => {
        const result: FunctionPerformedDB[] = await BaseDatabase.connection(FunctionPerformedDatabase.TABLE_FUNCTION_PERFORMED)
            .select()

        return result
    }

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase.connection(FunctionPerformedDatabase.TABLE_FUNCTION_PERFORMED)
            .delete()
            .where({ id })
    }

    public update = async (id: string, functionPerformedDB: FunctionPerformedDB): Promise<void> => {
        await BaseDatabase.connection(FunctionPerformedDatabase.TABLE_FUNCTION_PERFORMED)
            .update(functionPerformedDB)
            .where({ id })
    }

    public getByContent = async(content:string):Promise<FunctionPerformedDB|null>=>{
        const result:FunctionPerformedDB[] = await BaseDatabase.connection(FunctionPerformedDatabase.TABLE_FUNCTION_PERFORMED).select().where({content})
        
        return result[0]
    }
}