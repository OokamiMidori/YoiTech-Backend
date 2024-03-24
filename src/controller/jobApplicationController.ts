import { Request, Response } from "express";
import { JobApplicationBusiness } from "../business/JobApplicationBusiness";
import { BaseError } from "../errors/BaseError";

export class JobApplicationController {
    constructor(
        private jobApplicationBusiness: JobApplicationBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                jobOpportunityId: req.body.jobOpportunityId
            }

            await this.jobApplicationBusiness.insertJobApplication(input)

            res.status(201).end()

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public accept = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                idApplication: req.params.id
            }

            await this.jobApplicationBusiness.acceptApplication(input)

            res.status(201).end()
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deny = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                idApplication: req.params.id
            }
            await this.jobApplicationBusiness.denyApplication(input)

            res.status(201).end()
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                idToDelete: req.params.id
            }

            await this.jobApplicationBusiness.deletejobApplication(input)

            res.status(201).end()
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public getUserId = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization
            }

            const output = await this.jobApplicationBusiness.getJobApplicationbyUserId(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}