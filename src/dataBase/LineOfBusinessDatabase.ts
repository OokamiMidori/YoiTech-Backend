import { LineOfBusinessDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class LineOfBusinessDatabase extends BaseDatabase {
    public static TABLE_LINE_OF_BUSINESS = "line_of_business"

    public insert = async (lineOfBusinessDB: LineOfBusinessDB): Promise<void> => {
        await BaseDatabase.connection(LineOfBusinessDatabase.TABLE_LINE_OF_BUSINESS)
            .insert(lineOfBusinessDB)
    }

    public getById = async (id: string): Promise<LineOfBusinessDB> => {
        const result: LineOfBusinessDB[] = await BaseDatabase.connection(LineOfBusinessDatabase.TABLE_LINE_OF_BUSINESS)
            .select()
            .where({ id })

        return result[0]
    }

    public update = async (id:string,lineOfBusinessDB:LineOfBusinessDB):Promise<void>=>{
        await BaseDatabase.connection(LineOfBusinessDatabase.TABLE_LINE_OF_BUSINESS)
        .update(lineOfBusinessDB)
        .where({id})
    }

    public delete = async (id:string):Promise<void>=>{
        await BaseDatabase.connection(LineOfBusinessDatabase.TABLE_LINE_OF_BUSINESS)
        .delete()
        .where({id})
    }

    public getAllLineOfBusiness = async ():Promise<LineOfBusinessDB[]>=>{
        const result:LineOfBusinessDB[] = await BaseDatabase.connection(LineOfBusinessDatabase.TABLE_LINE_OF_BUSINESS)
        .select()

        return result
    }
    
    public getLineOfBusinessByContent = async (content:string) :Promise<LineOfBusinessDB>=>{
        const result: LineOfBusinessDB[] =  await BaseDatabase.connection(LineOfBusinessDatabase.TABLE_LINE_OF_BUSINESS)
        .select()
        .where({content})

        return result[0]
    }

  
}