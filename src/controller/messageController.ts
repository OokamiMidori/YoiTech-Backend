import { Request, Response } from "express";
import { MessageBusiness } from "../business/MessageBusiness";
import { BaseError } from "../errors/BaseError";

export class MessageController {
    constructor(
        private messageBusiness: MessageBusiness
    ) { }

    public createMessage = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                companyId: req.body.companyId,
                userId: req.body.userId,
                content: req.body.content
            }

            await this.messageBusiness.createMessage(input)

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

    public getMessageByCreatorId = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization
            }
            const output = await this.messageBusiness.getMessagesByCreatorId(input)

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

    public getMessageByCompanyId = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                companyId: req.params.id
            }

            const output = await this.messageBusiness.getMessagesByCompanyId(input)

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

    public getMessageByUserId = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                userId: req.params.id
            }

            const output = await this.messageBusiness.getMessagesByUserID(input)

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

            await this.messageBusiness.deleteMessage(input)

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
}