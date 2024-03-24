import { Request, Response } from "express";
import { MoveDisponibilityBusiness } from "../business/MoveDisponibilityBusiness";
import { BaseError } from "../errors/BaseError";

export class MoveDisponibilityController {
    constructor(
        private moveDisponibilityBusiness: MoveDisponibilityBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                availabilityTOMove: req.body.availabilityTOMove,
                needHousing: req.body.needHousing,
                needTransportationToMove: req.body.needTransportationToMove,
                pet: req.body.pet,
                petType: req.body.petType
            }

            await this.moveDisponibilityBusiness.createMoveDisponibility(input)

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
                availabilityTOMove: req.body.availabilityTOMove,
                needHousing: req.body.needHousing,
                needTransportationToMove: req.body.needTransportationToMove,
                pet: req.body.pet,
                petType: req.body.petType
            }

            await this.moveDisponibilityBusiness.editMoveDisponibility(input)

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
            await this.moveDisponibilityBusiness.deleteMoveDisponibility(input)

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
                userId: req.params.id
            }

            const output = await this.moveDisponibilityBusiness.getMoveDisponibility(input)

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