import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { ActivationEmailInputDTO, LoginInputDTO, SignupInputDTO, SignupOutputDTO } from "../dtos/userDTO";
import { BaseError } from "../errors/BaseError";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public signup = async (req: Request, res: Response) => {
        try {
            const input: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                birthDate: req.body.birthDate,
                gender: req.body.gender,
                nationality: req.body.nationality,
                maritalStatus: req.body.maritalStatus

            }

            const output: SignupOutputDTO = await this.userBusiness.signup(input)

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
            const input: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }
            const output: SignupOutputDTO = await this.userBusiness.Login(input)

            res.status(200).send(output)
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
            const input: ActivationEmailInputDTO = {
                token: req.headers.authorization,
                email: req.body.email,
                confirmation: req.body.confirmation
            }
            await this.userBusiness.emailActivation(input)

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

    public getUser = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                idToGet: req.params.id
            }

            const output = await this.userBusiness.getUser(input)

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

    public createUserAdmin = async (req: Request, res: Response) => {
        try {
            const input = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                birthDate: req.body.birthDate,
                gender: req.body.gender,
                nationality: req.body.nationality,
                maritalStatus: req.body.maritalStatus
            }

            const output = await this.userBusiness.signupAdmin(input)
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