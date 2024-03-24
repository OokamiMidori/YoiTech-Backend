import { CompanyAdressDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class CompanyAdressDatabase extends BaseDatabase {
    public static TABLE_COMPANY_ADRESS = "company_adress"

    public insert = async (companyAdressDB: CompanyAdressDB): Promise<void> => {
        await BaseDatabase.connection(CompanyAdressDatabase.TABLE_COMPANY_ADRESS)
            .insert(companyAdressDB)
    }

    public delete = async (id: string): Promise<void> => {
        BaseDatabase.connection(CompanyAdressDatabase.TABLE_COMPANY_ADRESS)
            .delete()
            .where({ id })
    }

    public update = async (id: string, companyAdressDB: CompanyAdressDB): Promise<void> => {
        await BaseDatabase.connection(CompanyAdressDatabase.TABLE_COMPANY_ADRESS)
            .update(companyAdressDB)
            .where({ id })
    }

    public getById = async (id: string): Promise<CompanyAdressDB> => {
        const result: CompanyAdressDB[] = await BaseDatabase.connection(CompanyAdressDatabase.TABLE_COMPANY_ADRESS)
            .select()
            .where({ id })

        return result[0]
    }

    public getAll = async (): Promise<CompanyAdressDB[]> => {
        const result: CompanyAdressDB[] = await BaseDatabase.connection(CompanyAdressDatabase.TABLE_COMPANY_ADRESS)
            .select()

        return result
    }

    public getByCompanyId = async (companyId: string):Promise <CompanyAdressDB>=> {
        const result: CompanyAdressDB[] = await BaseDatabase.connection(CompanyAdressDatabase.TABLE_COMPANY_ADRESS)
        .select()
        .where("company_adress.companyid", companyId)

        return result[0]
    }
}