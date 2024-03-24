import { UserDetailModel } from "../Types"

export interface CreateUserDetailsInputDTO {
    token:string|undefined,
    userId:string,
    drivingLicense:number,
    licenseTypeId:string,
    meansOfTransport:string,
    gradeLevel:string,
    profissionalLicenseId:string,
    japaneseConversationStatus:string,
    japaneseReadingStatus:string,
    japaneseDescentDegree:string,
    japaneseVisaType:string,
    japaneseChildStatus:string,
    childNumber:number,
    childSchoolAge:string
}



export interface GetUserDetailInputDTO{
    token:string|undefined
}

export type getUserDetailOutputDTO = UserDetailModel

export interface deletUserDetailInputDTO{
    token:string|undefined
}

export interface editUserDetailInputDTO{
    token:string|undefined,
    userId:string,
    drivingLicense:number,
    licenseTypeId:string,
    meansOfTransport:string,
    gradeLevel:string,
    profissionalLicenseId:string,
    japaneseConversationStatus:string,
    japaneseReadingStatus:string,
    japaneseDescentDegree:string,
    japaneseVisaType:string,
    japaneseChildStatus:string,
    childNumber:number,
    childSchoolAge:string,
    
}