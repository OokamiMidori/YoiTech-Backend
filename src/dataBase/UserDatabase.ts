import { UserCompleteDB, UserDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USER = "user"
    public static TABLE_USER_ADRESS = "user_adress"
    public static TABLE_USER_DETAIL = "user_detail"
    public static TABLE_USER_JOB = "user_job"
    public static TABLE_USER_MEASUREMENT_DETAILS = "user_measurement_details"
    public static TABLE_USER_MOVE_DISPONIBILITY = "move_disponibility"
    public static TABLE_USER_WIRK_HISTORY = "work_history"
    public static TABLE_USER_IMG = "user_img"

    public insert = async (userDB: UserDB) => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USER)
            .insert(userDB)
    }

    public findByEmail = async (email: string): Promise<UserDB | undefined> => {
        const result: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USER)
            .select()
            .where({ email })

        return result[0]
    }

    public findById = async (id: string): Promise<UserDB | undefined> => {
        const result: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USER)
            .select()
            .where({ id })

        return result[0]
    }


    public deleteUserById = async (id: string): Promise<void> => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USER)
            .delete()
            .where({ id })
    }

    public getAllUsers = async (): Promise<UserDB[]> => {
        const result: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USER)
            .select()

        return result
    }

    public getUserComplete = async (id: string): Promise<UserCompleteDB | void> => {
        const result: UserCompleteDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USER)
            .select(
                "user.id",
                "user.name",
                "user.email",
                "user.role",
                "user.phone_number",
                "user.birth_date",
                "user.gender",
                "user.nationality",
                "user.marital_status",
                "user_img.img AS img",
                "user_adress.cep AS cep_number",
                "user_adress.city",
                "user_adress.neighborhood AS neighborhood",
                "user_adress.apartment",
                "move_disponibility.availability_to_move",
                "move_disponibility.need_housing",
                "move_disponibility.need_transportation_to_move",
                "user_measurement_details.height",
                "user_measurement_details.weight",
                "user_measurement_details.uniform_shirt",
                "user_measurement_details.uniform_pants",
                "user_measurement_details.glasses",
                "user_measurement_details.dominant_hand",
                "user_measurement_details.tatoo",
                "user_measurement_details.piercing",
                "user_measurement_details.smooker",
                "user_detail.driving_license",
                "user_detail.license_type_id AS license_type",
                "user_detail.means_of_transport",
                "user_detail.grade_level",
                "user_detail.profissional_license_id AS profissional_license",
                "user_detail.japanese_conversation_status",
                "user_detail.japanese_reading_status",
                "user_detail.japanese_visa_type",
                "user_detail.japanese_child_status",
                "user_detail.child_number AS number_of_children",
                "user_detail.child_school_age AS school_age",
                "city.name AS city_name"
            )
            .join("user_adress", "user.id", "=", "user_adress.user_id")
            .join("move_disponiblity", "user.id", "=", "move_disponibility.user_id")
            .join("user_measurement_details", "user.id", "=", "user_measurement_detail.user_id")
            .join("user_img", "user.id", "=", "user_img.user_id")
            .join("user_detail", "user.id", "=", "user_detail.user_id")
            .join("city", "user_adress.city_id", "=", "city.id")
            .where("user.id", id)


        return result[0]
    }

    public updateUser = async (id: string, userDB: UserDB): Promise<void> => {
        await BaseDatabase.connection(UserDatabase.TABLE_USER)
            .update(userDB)
            .where({ id })
    }


}