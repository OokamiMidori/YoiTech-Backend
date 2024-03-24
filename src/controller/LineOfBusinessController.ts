import { Request, Response } from "express";
import { LineOfBusinessBusiness } from "../business/LineOfBusinessBusiness";
import { LineOfBusinessInputDTO } from "../dtos/lineOfBusinessDTO";
import { BaseError } from "../errors/BaseError";

export class LineOfBusinessController {
    constructor(
        private lineOfBusinessBusiness: LineOfBusinessBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input: LineOfBusinessInputDTO = {
                token: req.headers.authorization,
                content: req.body.content
            }

            await this.lineOfBusinessBusiness.createLineOfBusiness(input)

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

    public getLineOfBusiness = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization
            }

            await this.lineOfBusinessBusiness.getLineOfBusiness(input)
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

    public deleteLineOfBusiness = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                id: req.params.id
            }

            await this.lineOfBusinessBusiness.deleteLineOfBusiness(input)

            res.send(201).end()

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editLineOfBusiness = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                idToEdit: req.params.id,
                content: req.body.content
            }

            await this.lineOfBusinessBusiness.editLineOfBusiness(input)

            res.send(201).end()


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