import { UserJobModel } from "../Types"

export interface createUserJobInputDTO {
    token: string | undefined,
    workingStatus: string,
    salaryClaim: string,
    startUpForecast: string,
    overtimeAvailability: string
}

export interface editUserJobInputDTO {
    token: string | undefined,
    workingStatus: string,
    salaryClaim: string,
    startUpForecast: string,
    overtimeAvailability: string
}

export interface deleteUserJobDTO {
    token: string | undefined,
    idToDelete: string
}

export interface getUserJobInputDTO {
    token: string | undefined
}

export type getUserJobOutputDTO = UserJobModel