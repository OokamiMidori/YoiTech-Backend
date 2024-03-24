import { DrivingLicenseTypeDB } from "../Types";
import { DrivingLicenseTypeDatabase } from "../dataBase/DrivingLicenseTypeDatabase";
import { drivingLicenseTypeInputDTO, getDrivingLicenseTypeInputDTO, getDrivingLicenseTypeOutputDTO } from "../dtos/drivingLicenseTypeDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { DrivingLicenseType } from "../models/drivingLicenseType";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class DrivingLicenseTypeBusiness {
    constructor(
        private drivingLicenseDatabase: DrivingLicenseTypeDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ) { }

    public createDrivingLicenseType = async (input: drivingLicenseTypeInputDTO): Promise<void> => {
        const { token, content } = input


        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (content !== "string") {
            throw new BadRequestError("'content' dever ser string")
        }

        const drivingLicenseOk = await this.drivingLicenseDatabase.getByContent(content)

        if (drivingLicenseOk) {
            throw new BadRequestError("Item já existente")
        }

        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()

        const newDrivingLicenseType = new DrivingLicenseType(
            id,
            content,
            createdAt
        )

        const DrivingLicenseTypeDB = newDrivingLicenseType.toDBModel()

        await this.drivingLicenseDatabase.insert(DrivingLicenseTypeDB)
    }

    public getDrivingLicenseType = async (input: getDrivingLicenseTypeInputDTO): Promise<getDrivingLicenseTypeOutputDTO> => {
        const { token } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const drivingLicenseTypeDB: DrivingLicenseTypeDB[] =
            await this.drivingLicenseDatabase.getAll()

        const DrivingLicenseTypeModel = drivingLicenseTypeDB.map((drivingLicenseTypeDB) => {
            const drivingLicenseType = new DrivingLicenseType(
                drivingLicenseTypeDB.id,
                drivingLicenseTypeDB.content,
                drivingLicenseTypeDB.created_at
            )
            return drivingLicenseType.toBusinessModel()
        })

        return DrivingLicenseTypeModel

    }
}