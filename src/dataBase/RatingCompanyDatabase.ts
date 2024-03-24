import { RatingCompanyDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class RatingCompanyDatabase extends BaseDatabase {
    public static TABLE_RATING_COMPANY = "rating_company"

    public insert = async (ratingCompanyDB: RatingCompanyDB): Promise<void> => {
        await BaseDatabase.connection(RatingCompanyDatabase.TABLE_RATING_COMPANY)
            .insert(ratingCompanyDB)
    }

    public getById = async (id: string): Promise<RatingCompanyDB> => {
        const result: RatingCompanyDB[] = await BaseDatabase.connection(RatingCompanyDatabase.TABLE_RATING_COMPANY)
            .select()
            .where({ id })

        return result[0]
    }

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase.connection(RatingCompanyDatabase.TABLE_RATING_COMPANY)
            .delete()
            .where({ id })
    }

    public update = async (id: string, ratingCompanyDB: RatingCompanyDB): Promise<void> => {
        await BaseDatabase.connection(RatingCompanyDatabase.TABLE_RATING_COMPANY)
            .update(ratingCompanyDB)
            .where({ id })
    }

    public getAllRating = async (): Promise<RatingCompanyDB[]> => {
        const result: RatingCompanyDB[] = await BaseDatabase.connection(RatingCompanyDatabase.TABLE_RATING_COMPANY)
            .select()

        return result
    }
}