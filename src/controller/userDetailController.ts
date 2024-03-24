import { Request, Response } from "express";
import { UserDetailBusiness } from "../business/UserDetailBusiness";
import { BaseError } from "../errors/BaseError";

export class UserDetailController {
    constructor(
        private userDetailBusiness: UserDetailBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                userId: req.body.userId,
                drivingLicense: req.body.drivingLicense,
                licenseTypeId: req.body.licenseTypeId,
                meansOfTransport: req.body.meansOfTransport,
                gradeLevel: req.body.gradeLevel,
                profissionalLicenseId: req.body.profissionalLicenseId,
                japaneseConversationStatus: req.body.japaneseConversationStatus,
                japaneseReadingStatus: req.body.japaneseReadingStatus,
                japaneseDescentDegree: req.body.japaneseDescentDegree,
                japaneseVisaType: req.body.japaneseVisaType,
                japaneseChildStatus: req.body.japaneseChildStatus,
                childNumber: req.body.childNumber,
                childSchoolAge: req.body.childSchoolAge
            }
            await this.userDetailBusiness.createUserDetails(input)

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
                userId: req.body.userId,
                drivingLicense: req.body.drivingLicense,
                licenseTypeId: req.body.licenseTypeId,
                meansOfTransport: req.body.meansOfTransport,
                gradeLevel: req.body.gradeLevel,
                profissionalLicenseId: req.body.profissionalLicenseId,
                japaneseConversationStatus: req.body.japaneseConversationStatus,
                japaneseReadingStatus: req.body.japaneseReadingStatus,
                japaneseDescentDegree: req.body.japaneseDescentDegree,
                japaneseVisaType: req.body.japaneseVisaType,
                japaneseChildStatus: req.body.japaneseChildStatus,
                childNumber: req.body.childNumber,
                childSchoolAge: req.body.childSchoolAge
            }
            await this.userDetailBusiness.editUserDetail(input)

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
                token: req.headers.authorization
            }
            await this.userDetailBusiness.deletUserDetail(input)

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

            const output = await this.userDetailBusiness.getUserDetail(input)

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