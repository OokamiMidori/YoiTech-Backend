import { Request, Response } from "express";
import { DrivingLicenseTypeBusiness } from "../business/DrivingLicenseTypeBusiness";
import { BaseError } from "../errors/BaseError";

export class DrivingLicenseTypeController {
    constructor(
        private drivingLicenseTypeBusiness: DrivingLicenseTypeBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                content: req.body.content
            }
            await this.drivingLicenseTypeBusiness.createDrivingLicenseType
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

    public get = async (req:Request, res:Response) =>{
        try {
            const input = {
                token:req.headers.authorization
            }
            const result = await this.drivingLicenseTypeBusiness.getDrivingLicenseType(input)

            res.status(201).send(result)
            
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

