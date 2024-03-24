import { UserMeasurementDetailsDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class UserMeasurementDetailsDatabase extends BaseDatabase {
    public static TABLE_USER_MEASUREMENT_DETAILS = "user_measurement_details"

    public isert = async(userMeasurementDetailsDB:UserMeasurementDetailsDB):Promise<void>=>{
        await BaseDatabase.connection(UserMeasurementDetailsDatabase.TABLE_USER_MEASUREMENT_DETAILS)
        .insert(userMeasurementDetailsDB)
    }

    public getById = async(id:string):Promise<UserMeasurementDetailsDB>=>{
        const result:UserMeasurementDetailsDB[] = await BaseDatabase.connection(UserMeasurementDetailsDatabase.TABLE_USER_MEASUREMENT_DETAILS)
        .select()
        .where("user_measurement_details.user_id", id)

        return result[0]
    }

    public delete = async(id:string):Promise<void>=>{
        await BaseDatabase.connection(UserMeasurementDetailsDatabase.TABLE_USER_MEASUREMENT_DETAILS)
        .delete()
        .where("user_measurement_details.user_id",id)
    }

    public update = async(id:string, userMeasurementDetailsDB:UserMeasurementDetailsDB):Promise<void>=>{
        await BaseDatabase.connection(UserMeasurementDetailsDatabase.TABLE_USER_MEASUREMENT_DETAILS)
        .update(userMeasurementDetailsDB)
        .where("user_measurement_details.user_id",id)
    }

    
}