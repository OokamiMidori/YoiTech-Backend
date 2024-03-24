import { Request, Response } from "express";
import { FunctionPerformedBusiness } from "../business/FunctionPerformedBusiness";
import { BaseError } from "../errors/BaseError";

export class FunctionPerformedController {
    constructor(
        private functionPerformedBusiness: FunctionPerformedBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                content: req.body.content,
                lineOfBusinessId: req.params.id
            }

            await this.functionPerformedBusiness.createFunctionPerformedDatabase(input)

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

    public getFunctionPerformed = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization
            }

            const output = await this.functionPerformedBusiness.getFunctionPerformed(input)

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

    public deleteFunctionPerformed = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                id: req.params.id
            }

            await this.functionPerformedBusiness.deleteFunctionPerformed(input)

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

    public updateFunctionPerformed = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                idToEdit: req.params.id,
                content: req.body.content
            }

            await this.functionPerformedBusiness.editFunctionPerformed(input)


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