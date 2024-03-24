import { Request, Response } from "express";
import { CompanyBusiness } from "../business/CompanyBusiness";
import { BaseError } from "../errors/BaseError";


export class CompanyController {
    constructor(
        private companyBusiness: CompanyBusiness
    ) { }

    public signup = async (req: Request, res: Response) => {
        try {
            const input = {
                responsableCompanyName: req.body.responsableCompanyName,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                cellPhoneNumber: req.body.cellPhoneNumber
            }
            const output = await this.companyBusiness.signup(input)

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

    public login = async (req: Request, res: Response) => {
        try {
            const input = {
                email: req.body.email,
                password: req.body.password
            }
            const output = await this.companyBusiness.login(input)

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

    public emailActivation = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                confirmation: req.body.confirmation,
                email: req.body.email
            }
            await this.companyBusiness.emailActivation(input)

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
            const output = await this.companyBusiness.getCompany(input)

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