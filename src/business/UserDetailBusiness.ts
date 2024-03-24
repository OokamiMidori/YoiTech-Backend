
import { UserDetailDatabase } from "../dataBase/UserDetailDatabase";
import { CreateUserDetailsInputDTO, GetUserDetailInputDTO, deletUserDetailInputDTO, editUserDetailInputDTO, getUserDetailOutputDTO } from "../dtos/userDetailDTO";

import { TokenManager, USER_ROLES } from "../services/TokenManager";
import { BadRequestError } from "../errors/BadRequestError";
import { UserDetail } from "../models/userDetail";
import { UserDatabase } from "../dataBase/UserDatabase";
import { UserDB, UserDetailDB } from "../Types";

export class UserDetailBusiness {
    constructor(
        private userDataBase: UserDatabase,
        private userDetailDatabase: UserDetailDatabase,        
        private tokenManager: TokenManager    
    ) { }

    public createUserDetails = async (input: CreateUserDetailsInputDTO): Promise<void> => {
        const { token, userId, drivingLicense, licenseTypeId, meansOfTransport, gradeLevel, profissionalLicenseId, japaneseConversationStatus, japaneseReadingStatus, japaneseDescentDegree, japaneseVisaType, japaneseChildStatus, childNumber, childSchoolAge } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof userId !== "string") {
            throw new BadRequestError("'UserId' deve ser string")
        }

        if (typeof drivingLicense !== "number") {
            throw new BadRequestError("'drivingLicense' deve ser string")
        }

        if (typeof licenseTypeId !== "string") {
            throw new BadRequestError("'licenseTypeId' deve ser string")
        }

        if (typeof meansOfTransport !== "string") {
            throw new BadRequestError("'meansOfTransport' deve ser string")
        }

        if (typeof gradeLevel !== "string") {
            throw new BadRequestError("'gradeLevel' deve ser string")
        }

        if (typeof profissionalLicenseId !== "string") {
            throw new BadRequestError("'profissionalLicenseId' deve ser string")
        }

        if (typeof japaneseConversationStatus !== "string") {
            throw new BadRequestError("'japaneseConversationStatus' deve ser string")
        }

        if (typeof japaneseReadingStatus !== "string") {
            throw new BadRequestError("'japaneseReadingStatus' deve ser string")
        }

        if (typeof japaneseDescentDegree !== "string") {
            throw new BadRequestError("'japaneseDescentDegree' deve ser string")
        }

        if (typeof japaneseVisaType !== "string") {
            throw new BadRequestError("'japaneseVisaType' deve ser string")
        }

        if (typeof japaneseChildStatus !== "string") {
            throw new BadRequestError("'japaneseChildStatus' deve ser string")
        }

        if (typeof childNumber !== "number") {
            throw new BadRequestError("'childNumber' deve ser number")
        }

        if (typeof childSchoolAge !== "string") {
            throw new BadRequestError("'childSchoolAge' deve ser string")
        }

        const UserDB: UserDB | undefined = await this.userDataBase.findById(userId)

        if (!UserDB) {
            throw new BadRequestError("'UserId' inválido")
        }

        const createdAt = new Date().toISOString()

        const newUserDetail = new UserDetail(
            userId,
            drivingLicense,
            licenseTypeId,
            meansOfTransport,
            gradeLevel,
            profissionalLicenseId,
            japaneseConversationStatus,
            japaneseReadingStatus,
            japaneseDescentDegree,
            japaneseVisaType,
            japaneseChildStatus,
            childNumber,
            childSchoolAge,
            createdAt
        )

        const userDetailDB = newUserDetail.toDBModel()

        await this.userDetailDatabase.insert(userDetailDB)

    }

    public getUserDetail = async (input: GetUserDetailInputDTO): Promise<getUserDetailOutputDTO> => {

        const { token } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const idBuscado = payload.id

        const userDetailDB: UserDetailDB = await this.userDetailDatabase.findByid(idBuscado)

        if (!userDetailDB) {
            throw new BadRequestError("UserDetail não cadastrado")
        }

        const userDetail = new UserDetail(
            userDetailDB.user_id,
            userDetailDB.driving_license,
            userDetailDB.license_type_id,
            userDetailDB.means_of_transport,
            userDetailDB.grade_level,
            userDetailDB.profissional_license_id,
            userDetailDB.japanese_conversation_status,
            userDetailDB.japanese_reading_status,
            userDetailDB.japanese_descent_degree,
            userDetailDB.japanese_visa_type,
            userDetailDB.japanese_child_status,
            userDetailDB.child_number,
            userDetailDB.child_school_age,
            userDetailDB.created_at
        )

        const userDetailModel = userDetail.toBusinessModel()

        return userDetailModel

    }

    public deletUserDetail = async (input: deletUserDetailInputDTO): Promise<void> => {
        const { token } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const idBuscado = payload.id

        const userDetailDB: UserDetailDB = await this.userDetailDatabase.findByid(idBuscado)

        if (!userDetailDB) {
            throw new BadRequestError("UserDetail não cadastrado")
        }


        await this.userDetailDatabase.delete(payload.id)
    }

    public editUserDetail = async (input:editUserDetailInputDTO)=>{
        const { token, userId, drivingLicense, licenseTypeId, meansOfTransport, gradeLevel, profissionalLicenseId, japaneseConversationStatus, japaneseReadingStatus, japaneseDescentDegree, japaneseVisaType, japaneseChildStatus, childNumber, childSchoolAge } = input

        if (!token) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof userId !== "string") {
            throw new BadRequestError("'UserId' deve ser string")
        }

        if (typeof drivingLicense !== "number") {
            throw new BadRequestError("'drivingLicense' deve ser string")
        }

        if (typeof licenseTypeId !== "string") {
            throw new BadRequestError("'licenseTypeId' deve ser string")
        }

        if (typeof meansOfTransport !== "string") {
            throw new BadRequestError("'meansOfTransport' deve ser string")
        }

        if (typeof gradeLevel !== "string") {
            throw new BadRequestError("'gradeLevel' deve ser string")
        }

        if (typeof profissionalLicenseId !== "string") {
            throw new BadRequestError("'profissionalLicenseId' deve ser string")
        }

        if (typeof japaneseConversationStatus !== "string") {
            throw new BadRequestError("'japaneseConversationStatus' deve ser string")
        }

        if (typeof japaneseReadingStatus !== "string") {
            throw new BadRequestError("'japaneseReadingStatus' deve ser string")
        }

        if (typeof japaneseDescentDegree !== "string") {
            throw new BadRequestError("'japaneseDescentDegree' deve ser string")
        }

        if (typeof japaneseVisaType !== "string") {
            throw new BadRequestError("'japaneseVisaType' deve ser string")
        }

        if (typeof japaneseChildStatus !== "string") {
            throw new BadRequestError("'japaneseChildStatus' deve ser string")
        }

        if (typeof childNumber !== "number") {
            throw new BadRequestError("'childNumber' deve ser number")
        }

        if (typeof childSchoolAge !== "string") {
            throw new BadRequestError("'childSchoolAge' deve ser string")
        }

      

        if(payload.role !== USER_ROLES.ADMIN && payload.id !== userId){
            throw new BadRequestError("Somente o usuário que criou ou um usuário ADM pode editar esse item")
        }

        const userDetailDB = await this.userDetailDatabase.findByid(userId)

        if (!userDetailDB){
            throw new BadRequestError("UserDetail não existe.")
        }

        const createdAt = new Date().toISOString()

        const userDetail = new UserDetail(
            userId,
            drivingLicense,
            licenseTypeId,
            meansOfTransport,
            gradeLevel,
            profissionalLicenseId,
            japaneseConversationStatus,
            japaneseReadingStatus,
            japaneseDescentDegree,
            japaneseVisaType,
            japaneseChildStatus,
            childNumber,
            childSchoolAge,
            createdAt
        )

        const userDetailEditadoDB = userDetail.toDBModel()

        await this.userDetailDatabase.update(userId, userDetailEditadoDB)
    }

}