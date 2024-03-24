import { ProfissionalLicenseDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class ProfissionalLicenseDatabase extends BaseDatabase {
    public static TABLE_PROFISSIONAL_LICENSE = "profissional_license"

    public insert = async (profissionalLicenseDB: ProfissionalLicenseDB): Promise<void> => {
        await BaseDatabase.connection(ProfissionalLicenseDatabase.TABLE_PROFISSIONAL_LICENSE)
            .insert(profissionalLicenseDB)
    }

    public getById = async (id:string):Promise<ProfissionalLicenseDB> =>{
        const result:ProfissionalLicenseDB[] = await BaseDatabase.connection(ProfissionalLicenseDatabase.TABLE_PROFISSIONAL_LICENSE)
        .select()
        .where({id})

        return result[0]
    }

    public update = async(id:string,profissionalLicenseDB:ProfissionalLicenseDB):Promise<void>=>{
        await BaseDatabase.connection(ProfissionalLicenseDatabase.TABLE_PROFISSIONAL_LICENSE)
        .update(profissionalLicenseDB)
        .where({id})

    }

    public delete = async(id:string):Promise<void>=>{
        BaseDatabase.connection(ProfissionalLicenseDatabase.TABLE_PROFISSIONAL_LICENSE)
        .delete()
        .where({id})
    }

    public getAllProfissionalLicensenses = async():Promise<ProfissionalLicenseDB[]>=>{
        const result:ProfissionalLicenseDB[] = await BaseDatabase.connection(ProfissionalLicenseDatabase.TABLE_PROFISSIONAL_LICENSE)
        .select()

        return result
    }

    public getByContent = async(content:string):Promise<ProfissionalLicenseDB|null>=>{
        const result:ProfissionalLicenseDB[] = await BaseDatabase.connection(ProfissionalLicenseDatabase.TABLE_PROFISSIONAL_LICENSE).select().where({content})

        return result[0]
    }
}