import { JobOpportunityDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class JobOpportunityDatabase extends BaseDatabase {
    public static TABLE_JOB_OPPORTUNITY = "job_opportunity"

    public insert = async (jobOpportunityDB: JobOpportunityDB): Promise<void> => {
        await BaseDatabase.connection(JobOpportunityDatabase.TABLE_JOB_OPPORTUNITY)
            .insert(jobOpportunityDB)
    }

    public getById = async (id: string): Promise<JobOpportunityDB> => {
        const result: JobOpportunityDB[] = await BaseDatabase.connection(JobOpportunityDatabase.TABLE_JOB_OPPORTUNITY)
            .select()
            .where({ id })

        return result[0]
    }

    public getAllJobOpportunity = async (): Promise<JobOpportunityDB[]> => {
        const result: JobOpportunityDB[] = await BaseDatabase.connection(JobOpportunityDatabase.TABLE_JOB_OPPORTUNITY)
            .select()

        return result
    }

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase.connection(JobOpportunityDatabase.TABLE_JOB_OPPORTUNITY)
            .delete()
            .where({ id })
    }

    public update = async (id: string, jobOpportunityDB: JobOpportunityDB): Promise<void> => {
        await BaseDatabase.connection(JobOpportunityDatabase.TABLE_JOB_OPPORTUNITY)
            .update(jobOpportunityDB)
            .where({ id })
    }

    public getByCompanyId = async (id: string): Promise<JobOpportunityDB> => {
        const result: JobOpportunityDB[] = await BaseDatabase.connection(JobOpportunityDatabase.TABLE_JOB_OPPORTUNITY)
            .select()
            .where("job_application.company_id", id)

        return result[0]
    }
}