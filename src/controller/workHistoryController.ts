import { Request, Response } from "express";
import { WorkHistoryBusiness } from "../business/WorkHistoryBusiness";
import { BaseError } from "../errors/BaseError";

export class WorkHistoryController {
    constructor(
        private workHistoryBusiness: WorkHistoryBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                companyName: req.body.companyName,
                factoryName: req.body.factoryName,
                stateProvince: req.body.stateProvince,
                lineOfBusiness: req.body.lineOfBusines,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                functionPerformedId: req.body.functionPerformedId,
                reasonTermination: req.body.reasonTermination
            }

            await this.workHistoryBusiness.createWorkHistory(input)

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

    public update = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                companyName: req.body.companyName,
                factoryName: req.body.factoryName,
                stateProvince: req.body.stateProvince,
                lineOfBusiness: req.body.lineOfBusines,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                functionPerformedId: req.body.functionPerformedId,
                reasonTermination: req.body.reasonTermination,
                idToUpdate: req.params.id
            }

            await this.workHistoryBusiness.updateWorkHistory(input)

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

            await this.workHistoryBusiness.deleteWorkHistory(input)

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
                token: req.headers.authorization,
                idToFind: req.params.id
            }

            const output = await this.workHistoryBusiness.getWorkHistory(input)

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