import { CompanyLogoDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class CompanyLogoDatabase extends BaseDatabase {
    public static TABLE_COMPANY_LOGO = "company_logo"

    public insert = async (companyLogoDB: CompanyLogoDB): Promise<void> => {
        await BaseDatabase.connection(CompanyLogoDatabase.TABLE_COMPANY_LOGO)
            .insert(companyLogoDB)

    }

    public getAll = async (): Promise<CompanyLogoDB[] | null> => {
        const result: CompanyLogoDB[] = await BaseDatabase.connection(CompanyLogoDatabase.TABLE_COMPANY_LOGO)
            .select()

        return result
    }

    public getById = async (id: string): Promise<CompanyLogoDB | null> => {
        const result: CompanyLogoDB[] = await BaseDatabase.connection(CompanyLogoDatabase.TABLE_COMPANY_LOGO)
            .select()
            .where({ id })

        return result[0]
    }

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase.connection(CompanyLogoDatabase.TABLE_COMPANY_LOGO)
            .delete()
            .where({ id })
    }

    public update = async (id: string, companyLogoDB: CompanyLogoDB): Promise<void> => {
        await BaseDatabase.connection(CompanyLogoDatabase.TABLE_COMPANY_LOGO)
            .update(companyLogoDB)
            .where({ id })
    }

    public getUserId = async (userId:string): Promise<CompanyLogoDB | null> => {
        const result: CompanyLogoDB[] = await BaseDatabase.connection(CompanyLogoDatabase.TABLE_COMPANY_LOGO)
            .select()
            .where( "company_logo.user_id", userId )

        return result[0]
    }
}