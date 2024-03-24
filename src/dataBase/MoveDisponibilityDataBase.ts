import { MoveDisponibilityDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class MoveDisponibilityDatabase extends BaseDatabase {
    public static TABLE_MOVEDISPONIBILITY = "move_disponibility"

    public insert = async (moveDisponibilityDB: MoveDisponibilityDB): Promise<void> => {
        await BaseDatabase.connection(MoveDisponibilityDatabase.TABLE_MOVEDISPONIBILITY)
            .insert(moveDisponibilityDB)
    }

    public delete = async (id: string): Promise<void> => {
        BaseDatabase.connection(MoveDisponibilityDatabase.TABLE_MOVEDISPONIBILITY).delete()
            .where({ user_id: id })
    }

    public update = async (id: string, moveDisponibilityDB: MoveDisponibilityDB): Promise<void> => {
        await BaseDatabase.connection(MoveDisponibilityDatabase.TABLE_MOVEDISPONIBILITY)
            .update(moveDisponibilityDB)
            .where({ user_id: id })
    }

    public findById = async (id:string):Promise<MoveDisponibilityDB>=>{
        const result:MoveDisponibilityDB[] = await BaseDatabase.connection(MoveDisponibilityDatabase.TABLE_MOVEDISPONIBILITY)
        .select()
        .where({user_id:id})

        return result[0]
    }
}

