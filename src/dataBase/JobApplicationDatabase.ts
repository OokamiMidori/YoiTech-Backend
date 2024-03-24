import { JobApplicationDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class JobApplicationDatabase extends BaseDatabase {
    public static TABLE_JOB_APPLICATION = "job_application"

    public insert = async (jobApplicationDB: JobApplicationDB): Promise<void> => {
        await BaseDatabase.connection(JobApplicationDatabase.TABLE_JOB_APPLICATION)
            .insert(jobApplicationDB)
    }

    public update = async (id: string, jobApplicationDB: JobApplicationDB): Promise<void> => {
        await BaseDatabase.connection(JobApplicationDatabase.TABLE_JOB_APPLICATION)
            .update(jobApplicationDB)
            .where({ id })
    }

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase.connection(JobApplicationDatabase.TABLE_JOB_APPLICATION)
            .delete()
            .where({ id })
    }

    public getById = async (id: string): Promise<JobApplicationDB> => {
        const result: JobApplicationDB[] = await BaseDatabase.connection(JobApplicationDatabase.TABLE_JOB_APPLICATION)
            .select()
            .where({ id })

        return result[0]
    }

    public getAll = async (): Promise<JobApplicationDB[]> => {
        const result: JobApplicationDB[] = await BaseDatabase.connection(JobApplicationDatabase.TABLE_JOB_APPLICATION)
            .select()

        return result
    }

    public getByUserID = async (userId:string) :Promise<JobApplicationDB[]> =>{
        const result:JobApplicationDB[] = await BaseDatabase.connection(JobApplicationDatabase.TABLE_JOB_APPLICATION)
        .select()
        .where("job_application.user_id",userId)

        return result
    }
}