import { Request, Response } from "express";
import { JobOpportunityBusiness } from "../business/JobOpportunityBusiness";
import { BaseError } from "../errors/BaseError";

export class JobOpportunityController {
    constructor(
        private jobOpportunityBusiness: JobOpportunityBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                functionPerformedId: req.body.functionPerformedId,
                city: req.body.city,
                hourlyWage: req.body.hourlyWage,
                shift: req.body.shift,
                overtime: req.body.overtime,
                minAge: req.body.minAge,
                maxAge: req.body.maxAge,
                japaneseCoversationStatus: req.body.japaneseConversationStatus,
                japaneseReadingStatus: req.body.japaneseReadingStatus,
                driverLicense: req.body.driverLicense,
                typeDriverLicense: req.body.typeDriverLicense,
                profissionalLicenseId: req.body.profissionalLicenseId,
                minHeight: req.body.minHeight,
                maxHeight: req.body.maxHeight,
                minWeight: req.body.minWeight,
                maxWeight: req.body.maxWeight,
                minUniformSize: req.body.minUniformSize,
                maxUniformSize: req.body.maxUniformSize,
                glass: req.body.glass,
                tatoo: req.body.tatoo,
                pircing: req.body.pircing,
                smooker: req.body.smooker,
                dominantHand: req.body.dominantHand,
                detailsJobOppotunity: req.body.detailsJobOpportunity,
                cep: req.body.cep,
                stateProvince: req.body.stateProvince
            }
            await this.jobOpportunityBusiness.insertjobOpportunity(input)
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

            await this.jobOpportunityBusiness.deleteJobOpportunity(input)

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
                functionPerformedId: req.body.functionPerformedId,
                city: req.body.city,
                hourlyWage: req.body.hourlyWage,
                shift: req.body.shift,
                overtime: req.body.overtime,
                minAge: req.body.minAge,
                maxAge: req.body.maxAge,
                japaneseCoversationStatus: req.body.japaneseConversationStatus,
                japaneseReadingStatus: req.body.japaneseReadingStatus,
                driverLicense: req.body.driverLicense,
                typeDriverLicense: req.body.typeDriverLicense,
                profissionalLicenseId: req.body.profissionalLicenseId,
                minHeight: req.body.minHeight,
                maxHeight: req.body.maxHeight,
                minWeight: req.body.minWeight,
                maxWeight: req.body.maxWeight,
                minUniformSize: req.body.minUniformSize,
                maxUniformSize: req.body.maxUniformSize,
                glass: req.body.glass,
                tatoo: req.body.tatoo,
                pircing: req.body.pircing,
                smooker: req.body.smooker,
                dominantHand: req.body.dominantHand,
                detailsJobOppotunity: req.body.detailsJobOpportunity,
                cep: req.body.cep,
                stateProvince: req.body.stateProvince,
                evaluation: req.body.evaluation
            }

            await this.jobOpportunityBusiness.updateJobOpportunity(input)

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
            const output = await this.jobOpportunityBusiness.getJobOpportunity(input)

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