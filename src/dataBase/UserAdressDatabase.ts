import { UserAdressDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class UserAdressDatabase extends BaseDatabase {
    public static TABLE_USER_ADRESS = "user_adress"

    public insert = async (userAdressDB: UserAdressDB): Promise<void> => {
        await BaseDatabase.connection(UserAdressDatabase.TABLE_USER_ADRESS)
            .insert(userAdressDB)
    }

    public getByUserId = async (id: string): Promise<UserAdressDB> => {
        const result: UserAdressDB[] = await BaseDatabase.connection(UserAdressDatabase.TABLE_USER_ADRESS)
            .select()
            .where("user_adress.user_id", id)

        return result[0]
    }

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase.connection(UserAdressDatabase.TABLE_USER_ADRESS)
            .delete()
            .where("user_adress.user_id", id)
    }

    public update = async (id: string, userAdressDB: UserAdressDB): Promise<void> => {
        await BaseDatabase.connection(UserAdressDatabase.TABLE_USER_ADRESS)
            .update(userAdressDB)
            .where("user_adress.user_id", id)

    }

    public getAllUserAdress = async (): Promise<UserAdressDB[]> => {
        const result: UserAdressDB[] = await BaseDatabase.connection(UserAdressDatabase.TABLE_USER_ADRESS)
            .select()

        return result
    }

    public getById = async (id: string): Promise<UserAdressDB> => {
        const result: UserAdressDB[] = await BaseDatabase.connection(UserAdressDatabase.TABLE_USER_ADRESS)
            .select()
            .where( {id})

        return result[0]
    }
}