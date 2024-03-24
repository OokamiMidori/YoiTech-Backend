import { Request, Response } from "express";
import { SiteRatingBusiness } from "../business/SiteRatingBusiness";
import { BaseError } from "../errors/BaseError";

export class SiteRatingController {
    constructor(
        private siteRatingBusiness: SiteRatingBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                companyId: req.params.id,
                rating: req.body.rating,
                message: req.body.message
            }

            await this.siteRatingBusiness.createSiteRating(input)

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

            await this.siteRatingBusiness.deleteSiteRating(input)

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

    public getRating = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization
            }

            const output = await this.siteRatingBusiness.getSiteRating(input)

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