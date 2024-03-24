import { DrivingLicenseTypeDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class DrivingLicenseTypeDatabase extends BaseDatabase {
    public static TABLE_DRIVING_LICENSE_TYPE = "driving_license_type"

    public insert = async (drivingLincenseTypeDB: DrivingLicenseTypeDB): Promise<void> => {
        await BaseDatabase.connection(DrivingLicenseTypeDatabase.TABLE_DRIVING_LICENSE_TYPE)
            .insert(drivingLincenseTypeDB)

    }

    public getById = async (id: string): Promise<DrivingLicenseTypeDB | null> => {
        const result: DrivingLicenseTypeDB[] = await BaseDatabase.connection(DrivingLicenseTypeDatabase.TABLE_DRIVING_LICENSE_TYPE)
            .select()
            .where({ id })

        return result[0]
    }

    public getByContent = async (content: string): Promise<DrivingLicenseTypeDB | null> => {
        const result: DrivingLicenseTypeDB[] = await BaseDatabase.connection(DrivingLicenseTypeDatabase.TABLE_DRIVING_LICENSE_TYPE)
            .select()
            .where({ content })

        return result[0]
    }

    public getAll = async (): Promise<DrivingLicenseTypeDB[]> => {
        const result: DrivingLicenseTypeDB[] = await BaseDatabase.connection(DrivingLicenseTypeDatabase.TABLE_DRIVING_LICENSE_TYPE)
            .select()

        return result
    }

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase.connection(DrivingLicenseTypeDatabase.TABLE_DRIVING_LICENSE_TYPE)
            .delete()
            .where({ id })

    }

    public update = async (id: string, drivingLincenseTypeDB: DrivingLicenseTypeDB): Promise<void> => {
        await BaseDatabase.connection(DrivingLicenseTypeDatabase.TABLE_DRIVING_LICENSE_TYPE)
            .update(drivingLincenseTypeDB)
            .where({ id })

    }
}