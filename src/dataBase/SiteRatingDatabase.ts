import { SiteRatingDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class SiteRatingDatabase extends BaseDatabase {
    public static TABLE_SITE_RATING = "site_rating"

    public insert = async (siteRatingDB: SiteRatingDB): Promise<void> => {
        await BaseDatabase.connection(SiteRatingDatabase.TABLE_SITE_RATING)
            .insert(siteRatingDB)
    }

    public getById = async (id: string): Promise<SiteRatingDB> => {
        const result: SiteRatingDB[] = await BaseDatabase.connection(SiteRatingDatabase.TABLE_SITE_RATING)
            .select()
            .where({ id })

        return result[0]
    }

    public update = async (id: string, siteRatingDB: SiteRatingDB): Promise<void> => {
        await BaseDatabase.connection(SiteRatingDatabase.TABLE_SITE_RATING)
            .update(siteRatingDB)
            .where({ id })
    }

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase.connection(SiteRatingDatabase.TABLE_SITE_RATING)
            .delete()
            .where({ id })
    }

    public getAllRating = async (): Promise<SiteRatingDB[]> => {
        const result: SiteRatingDB[] = await BaseDatabase.connection(SiteRatingDatabase.TABLE_SITE_RATING)
            .select()

        return result
    }
}