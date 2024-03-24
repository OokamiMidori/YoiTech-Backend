import { MessageDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class MessageDatabase extends BaseDatabase {
    public static TABLE_MESSAGE = "message"

    public insert = async (messageDB: MessageDB): Promise<void> => {
        await BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
            .insert(messageDB)
    }

    public update = async (id: string, messageDB: MessageDB): Promise<void> => {
        await BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
            .update(messageDB)
            .where({ id })
    }

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
            .delete()
            .where({ id })

    }

    public getById = async (id: string): Promise<MessageDB> => {
        const result: MessageDB[] = await BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
            .select()
            .where({ id })

        return result[0]
    }

    public getAllMessage = async (): Promise<MessageDB[]> => {
        const result: MessageDB[] = await BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
            .select()

        return result
    }

    public getAllMessageByCompanyId = async (id: string): Promise<MessageDB[]> => {
        const result: MessageDB[] = await BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
            .select()
            .where("message.company_id", id)

        return result
    }

    public getAllMessageByUserId = async (id: string): Promise<MessageDB[]> => {
        const result: MessageDB[] = await BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
            .select()
            .where("message.user_id", id)

        return result
    }

    public getAllMessageByCreatorId = async (id: string): Promise<MessageDB[]> => {
        const result: MessageDB[] = await BaseDatabase.connection(MessageDatabase.TABLE_MESSAGE)
            .select()
            .where("message.creator_id", id)

        return result
    }

}