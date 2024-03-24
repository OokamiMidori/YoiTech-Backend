import { Request, Response } from "express";
import { UserMeasurimentDetailsBusiness } from "../business/UserMeasurimentDetailsBusiness";
import { BaseError } from "../errors/BaseError";

export class UserMeasurementController {
    constructor(
        private userMeasurimentDetailBusiness: UserMeasurimentDetailsBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                height: req.body.height,
                weight: req.body.weight,
                uniformShirt: req.body.uniformShirt,
                uniformPants: req.body.uniformPants,
                dominantHand: req.body.dominantHand,
                glasses: req.body.glasses,
                tatoo: req.body.tatoo,
                piercing: req.body.piercing,
                smooker: req.body.smooker,
                medicalTreatment: req.body.medicalTreatment,
                typeOfTreatment: req.body.typeOfTreatment
            }

            await this.userMeasurimentDetailBusiness.createUserMeasurementDetails(input)

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

    public edit = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                height: req.body.height,
                weight: req.body.weight,
                uniformShirt: req.body.uniformShirt,
                uniformPants: req.body.uniformPants,
                dominantHand: req.body.dominantHand,
                glasses: req.body.glasses,
                tatoo: req.body.tatoo,
                piercing: req.body.piercing,
                smooker: req.body.smooker,
                medicalTreatment: req.body.medicalTreatment,
                typeOfTreatment: req.body.typeOfTreatment
            }

            await this.userMeasurimentDetailBusiness.editUserMeasurementDetails(input)

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
            const output = await this.userMeasurimentDetailBusiness.getUserMeasurementDetails(input)

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

    public delete = async (req:Request, res:Response)=>{
        try {
            const input = {
                token:req.headers.authorization,
                idToDelete:req.params.id
            }
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