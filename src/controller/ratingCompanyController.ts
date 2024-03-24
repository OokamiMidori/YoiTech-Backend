import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { RatingCompanyBusiness } from "../business/RatingCompanyBusiness";


export class RatingCompanyController {
    constructor(
        private ratingCompanyBusiness: RatingCompanyBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                applicationId: req.params.id,
                rating: req.body.rating,
                message: req.body.message
            }
            await this.ratingCompanyBusiness.createCompanyRating(input)

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

            await this.ratingCompanyBusiness.deleteRating(input)

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

    public getRatingCompanyId = async (req: Request, res: Response) => {
        try {

            const input = {
                token: req.headers.authorization
            }

            const output = await this.ratingCompanyBusiness.getRatingCompanyByCompanyId(input)

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