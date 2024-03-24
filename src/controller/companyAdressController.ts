import { Request, Response } from "express";
import { CompanyAdressBusiness } from "../business/CompanyAdressBusiness";
import { BaseError } from "../errors/BaseError";

export class CompanyAdressController {
    constructor(
        private companyAdressBusiness: CompanyAdressBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                companyId: req.body.companyId,
                cep: req.body.cep,
                city: req.body.city,
                neighborhood: req.body.neighborhood,
                apartment: req.body.apartement
            }
            await this.companyAdressBusiness.createCompanyAdress(input)
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
            await this.companyAdressBusiness.deleteCompanyAdress(input)

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
                companyId: req.params.companyId,
                cep: req.body.cep,
                city: req.body.city,
                neighborhood: req.body.neighborhood,
                apartment: req.body.apartement
            }

            await this.companyAdressBusiness.updateUserAdress(input)

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

            const output = await this.companyAdressBusiness.getCompanyAdress(input)

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