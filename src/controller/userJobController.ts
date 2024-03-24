import { UserJobBusiness } from "../business/UserJobBusiness";
import { Request, Response } from "express"
import { BaseError } from "../errors/BaseError";

export class UserJobController {
    constructor(
        private userJobBusiness: UserJobBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                workingStatus: req.body.workingStatus,
                salaryClaim: req.body.salaryClaim,
                startUpForecast: req.body.startUpForecast,
                overtimeAvailability: req.body.overtimeAvailability
            }
            await this.userJobBusiness.createUserJob(input)
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

    public edit = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                workingStatus: req.body.workingStatus,
                salaryClaim: req.body.salaryClaim,
                startUpForecast: req.body.startUpForecast,
                overtimeAvailability: req.body.overtimeAvailability
            }
            await this.userJobBusiness.editUserJob(input)
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

    public get = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization
            }

            const output = await this.userJobBusiness.getUserJob(input)
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

    public delete = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                idToDelete: req.params.id
            }

            await this.userJobBusiness.deleteUserJob(input)

            res.status(210).end()
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