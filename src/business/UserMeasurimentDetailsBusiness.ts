import { UserMeasurementDetailsDatabase } from "../dataBase/UserMeasurementDetailsDatabase";
import { createUserMeasurementDetailsInputDTO, deleteUserMeasurementDetailInputDTO, editUserMeasurementDetailInputDTO, getUserMeasurementDetailInputDTO, getUserMeasurementDetailOutputDTO } from "../dtos/userMeasurementDetailsDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { UserMeasurementDetails } from "../models/userMeasurementDetails";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES } from "../services/TokenManager";

export class UserMeasurimentDetailsBusiness {
    constructor(
        private userMeasurimentDatabase: UserMeasurementDetailsDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ) { }

    public createUserMeasurementDetails = async (input: createUserMeasurementDetailsInputDTO): Promise<void> => {
        const { token, height, weight, uniformShirt, uniformPants, dominantHand, glasses, tatoo, piercing, smooker, medicalTreatment, typeOfTreatment } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const userId = payload.id

        const userMeasurementDetailExist = await this.userMeasurimentDatabase.getById(userId)


        if (userMeasurementDetailExist) {
            throw new BadRequestError("Usuário já possui detalhes de medidas")
        }

        if (typeof height !== "string") {
            throw new BadRequestError("height deve ser string")
        }

        if (typeof weight !== "string") {
            throw new BadRequestError("weight deve ser string")
        }
        if (typeof uniformShirt !== "string") {
            throw new BadRequestError("uniformShirt deve ser string")
        }
        if (typeof uniformPants !== "string") {
            throw new BadRequestError("uniformPants deve ser string")
        }
        if (typeof dominantHand !== "string") {
            throw new BadRequestError("dominantHand deve ser string")
        }
        if (typeof glasses !== "number") {
            throw new BadRequestError("glasses deve ser number")
        }
        if (typeof tatoo !== "string") {
            throw new BadRequestError("tatoo deve ser string")
        }
        if (typeof piercing !== "number") {
            throw new BadRequestError("piercing deve ser number")
        }
        if (typeof smooker !== "number") {
            throw new BadRequestError("smooker deve ser number")
        }
        if (typeof medicalTreatment !== "string") {
            throw new BadRequestError("medicalTreatment deve ser number")
        }
        if (typeof typeOfTreatment !== "string") {
            throw new BadRequestError("typeOfTreatment deve ser string")
        }

        const createdAt = new Date().toISOString()

        const userMeasurementDetails = new UserMeasurementDetails(
            userId,
            height,
            weight,
            uniformShirt,
            uniformPants,
            dominantHand,
            glasses,
            tatoo,
            piercing,
            smooker,
            medicalTreatment,
            typeOfTreatment,
            createdAt
        )

        const userMeasurementDetailsDB = userMeasurementDetails.toDBModel()

        await this.userMeasurimentDatabase.isert(userMeasurementDetailsDB)
    }

    public getUserMeasurementDetails = async (input: getUserMeasurementDetailInputDTO): Promise<getUserMeasurementDetailOutputDTO> => {

        const { token } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const idToGet = payload.id

        const userMeasurementDetailDB = await this.userMeasurimentDatabase.getById(idToGet)

        const userMeasurementDetails = new UserMeasurementDetails(
            userMeasurementDetailDB.user_id,
            userMeasurementDetailDB.height,
            userMeasurementDetailDB.weight,
            userMeasurementDetailDB.uniform_shirt,
            userMeasurementDetailDB.uniform_pants,
            userMeasurementDetailDB.dominant_hand,
            userMeasurementDetailDB.glasses,
            userMeasurementDetailDB.tatoo,
            userMeasurementDetailDB.piercing,
            userMeasurementDetailDB.smooker,
            userMeasurementDetailDB.medical_treatment,
            userMeasurementDetailDB.type_of_treatment,
            userMeasurementDetailDB.created_at
        )

        const userMeasurementDetailsModel = userMeasurementDetails.toBusinessModel()

        return userMeasurementDetailsModel
    }

    public editUserMeasurementDetails = async (input: editUserMeasurementDetailInputDTO): Promise<void> => {
        const { token, height, weight, uniformShirt, uniformPants, dominantHand, glasses, tatoo, piercing, smooker, medicalTreatment, typeOfTreatment } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const userId = payload.id

        const userMeasurementDetailExist = await this.userMeasurimentDatabase.getById(userId)


        if (!userMeasurementDetailExist) {
            throw new BadRequestError("Item inexistente")
        }

        if (typeof height !== "string") {
            throw new BadRequestError("height deve ser string")
        }

        if (typeof weight !== "string") {
            throw new BadRequestError("weight deve ser string")
        }
        if (typeof uniformShirt !== "string") {
            throw new BadRequestError("uniformShirt deve ser string")
        }
        if (typeof uniformPants !== "string") {
            throw new BadRequestError("uniformPants deve ser string")
        }
        if (typeof dominantHand !== "string") {
            throw new BadRequestError("dominantHand deve ser string")
        }
        if (typeof glasses !== "number") {
            throw new BadRequestError("glasses deve ser number")
        }
        if (typeof tatoo !== "string") {
            throw new BadRequestError("tatoo deve ser string")
        }
        if (typeof piercing !== "number") {
            throw new BadRequestError("piercing deve ser number")
        }
        if (typeof smooker !== "number") {
            throw new BadRequestError("smooker deve ser number")
        }
        if (typeof medicalTreatment !== "string") {
            throw new BadRequestError("medicalTreatment deve ser number")
        }
        if (typeof typeOfTreatment !== "string") {
            throw new BadRequestError("typeOfTreatment deve ser string")
        }

        const createdAt = new Date().toISOString()

        const userMeasurementDetails = new UserMeasurementDetails(
            userId,
            height,
            weight,
            uniformShirt,
            uniformPants,
            dominantHand,
            glasses,
            tatoo,
            piercing,
            smooker,
            medicalTreatment,
            typeOfTreatment,
            createdAt
        )

        const userMeasurementDetailsDB = userMeasurementDetails.toDBModel()

        await this.userMeasurimentDatabase.update(userId, userMeasurementDetailsDB)
    }

    public deleteUserMeasurementDetail = async (input: deleteUserMeasurementDetailInputDTO): Promise<void> => {
        const { token, idToDelete } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const userId = payload.id

        const userMeasurementDetailExist = await this.userMeasurimentDatabase.getById(userId)


        if (!userMeasurementDetailExist) {
            throw new BadRequestError("Item inexistente")
        }

        if (payload.role !== USER_ROLES.ADMIN && payload.id !== idToDelete) {
            throw new BadRequestError("Somente quem criou pode deletar.")
        }

        await this.userMeasurimentDatabase.delete(idToDelete)
    }


}