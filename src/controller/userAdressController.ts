import { Request, Response } from "express";
import { UserAdressBusiness } from "../business/UserAdressBusiness";
import { BaseError } from "../errors/BaseError";

export class UserAdressController {
    constructor(
        private userAdressBusiness: UserAdressBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                userId: req.body.userId,
                cep: req.body.cep,
                stateProvince: req.body.stateProvince,
                city: req.body.city,
                neighborhood: req.body.neighborhood,
                apartment: req.body.apartement
            }
            await this.userAdressBusiness.createUserAdress(input)

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
            const output = await this.userAdressBusiness.getUserAdress(input)

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
                idToDelet: req.body.idToDelet
            }
            await this.userAdressBusiness.deleteUserAdress(input)
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
                idToEdit: req.body.idToEdit,
                cep: req.body.cep,
                stateProvince: req.body.stateProvince,
                city: req.body.city,
                neighborhood: req.body.neighborhood,
                apartment: req.body.apartement
            }

            await this.userAdressBusiness.updateUserAdress(input)
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