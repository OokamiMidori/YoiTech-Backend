import { CompanyDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class CompanyDatabase extends BaseDatabase {
    public static TABLE_COMPANY = "company"

    public insert = async (companyDB: CompanyDB): Promise<void> => {
        await BaseDatabase.connection(CompanyDatabase.TABLE_COMPANY)
            .insert(companyDB)
    }

    public getAll = async (): Promise<CompanyDB[] | null> => {
        const result: CompanyDB[] = await BaseDatabase.connection(CompanyDatabase.TABLE_COMPANY)
            .select()

        return result
    }

    public getById = async (id: string): Promise<CompanyDB | null> => {
        const result: CompanyDB[] = await BaseDatabase.connection(CompanyDatabase.TABLE_COMPANY)
            .select()
            .where({ id })

        return result[0]
    }

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase.connection(CompanyDatabase.TABLE_COMPANY)
            .delete()
            .where({ id })
    }

    public update = async (id: string, companyDB: CompanyDB): Promise<void> => {
        await BaseDatabase.connection(CompanyDatabase.TABLE_COMPANY)
            .update(companyDB)
            .where({ id })
    }

    public findByEmail = async (email: string): Promise<CompanyDB | undefined> => {
        const result: CompanyDB[] = await BaseDatabase.connection(CompanyDatabase.TABLE_COMPANY)
            .select()
            .where({ email })

            return result[0]
    }
}