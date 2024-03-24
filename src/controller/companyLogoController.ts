import { Request, Response } from "express";
import { CompanyLogoBusiness } from "../business/CompanyLogoBusiness";
import { BaseError } from "../errors/BaseError";

export class CompanyLogoController {
    constructor(
        private companyLogoBusiness: CompanyLogoBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                logo: req.body.logo
            }

            await this.companyLogoBusiness.insertCompanyLogo(input)
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
                companyId: req.params.id
            }

            const output = await this.companyLogoBusiness.getCompanyLogo(input)

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
            await this.companyLogoBusiness.deleteCompanyLogo(input)

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
                idToUpdate: req.params.id,
                logo: req.body.logo
            }
            await this.companyLogoBusiness.updateCompanyLogo(input)

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