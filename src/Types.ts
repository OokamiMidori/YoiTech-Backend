export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export enum EMAIL_STATUS {
    ATIVO = "ATIVO",
    INATIVO = "INATIVO"
}

export enum STATUS_USER_COMPANY {
    ATIVO = "ATIVO",
    INATIVO = "INATIVO"
}

export interface TokenPayload {
    id: string,
    name: string,
    role: USER_ROLES
}

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    phone_number: string,
    birth_date: string,
    gender: string,
    nationality: string,
    marital_status: string,
    status: STATUS_USER_COMPANY,
    email_status: EMAIL_STATUS,
    created_at: string
}

// export interface RegionDB {
//     id: string,
//     name: string
// }

// export interface StateProvinceDB {
//     id: string,
//     region_id: string,
//     name: string
// }

// export interface StateProvinceWithRegionDB extends StateProvinceDB {
//     region_name: string
// }

// export interface CityDB {
//     id: string,
//     state_province_id: string,
//     name: string
// }

// export interface CityWhithStateProvinceAndRegionDB extends CityDB {
//     state_province_name: string,
//     region_name: string
// }

export interface LineOfBusinessDB {
    id: string,
    content: string
    created_at:string
}

export interface FunctionPerformedDB {
    id: string,
    line_of_business_id: string,
    content: string
    created_at:string
}

export interface FunctionPerformedWithLineOfBusinessDB extends FunctionPerformedDB {
    line_of_business_name: string
}

export interface ProfissionalLicenseDB {
    id: string,
    content: string,
    created_at:string
}

export interface UserAdressDB {
    user_id: string,
    id:string,
    cep: string,
    state_province: string,
    city: string,
    neighborhood: string,
    apartment: string,
    created_at: string
}

export interface DrivingLicenseTypeDB {
    id: string,
    content: string,
    created_at: string
}

export interface UserDetailDB {
    user_id: string,
    driving_license: number,
    license_type_id: string,
    means_of_transport: string,
    grade_level: string,
    profissional_license_id: string,
    japanese_conversation_status: string,
    japanese_reading_status: string,
    japanese_descent_degree: string,
    japanese_visa_type: string,
    japanese_child_status: string,
    child_number: number,
    child_school_age: string,
    created_at: string
}

export interface UserJobDB {
    user_id: string,
    working_status: string,
    salary_claim: string,
    start_up_forecast: string,
    overtime_availability: string
}

export interface UserMeasurementDetailsDB {
    user_id: string,
    height: string,
    weight: string,
    uniform_shirt: string,
    uniform_pants: string,
    dominant_hand: string,
    glasses: number,
    tatoo: string,
    piercing: number,
    smooker: number,
    medical_treatment: number,
    type_of_treatment: string,
    created_at: string
}

export interface MoveDisponibilityDB {
    user_id: string,
    availability_to_move: number,
    need_housing: number,
    need_transportation_to_move: number,
    created_at: string,
    pet: number,
    pet_type: string
}

export interface WorkHistoryDB {
    id: string,
    user_id: string,
    company_name: string,
    factory_name: string,
    state_province: string,
    line_of_business: string,
    start_time: string,
    end_time: string,
    function_performed_id: string,
    reason_termination: string,
    created_at: string
}

export interface UserImgDB {
    user_id: string,
    img: string,
    created_at: string
}

export interface CompanyDB {
    id: string,
    responsible_company_name: string,
    email: string,
    password: string,
    phone_number: string,
    cell_phone_number: string,
    role:USER_ROLES,
    status: STATUS_USER_COMPANY,
    email_status: EMAIL_STATUS,
    created_at: string
}

export interface CompanyAdressDB {
    id: string,
    company_id: string,
    cep: string,
    city: string,
    neighborhood: string,
    apartment: string,
    created_at: string
}

export interface CompanyLogoDB {
    id: string,
    company_id: string,
    logo_img: string,
    created_at: string
}

export interface JobOpportunityDB {
    id: string,
    company_id: string,
    function_performed_id: string,
    city: string,
    cep:string,
    state_province:string,
    hourly_wage: string,
    shift: string,
    overtime: string,
    min_age: number,
    max_age: number,
    japanese_coversation_status: number,
    japanese_reading_status: number,
    driver_license: string,
    type_driver_license: string,
    profissional_license_id: string,
    min_height: number,
    max_height: number,
    min_weight: number,
    max_weight: number,
    min_uniform_size: string,
    max_uniform_size: string,
    glass: string,
    tatoo: string,
    pircing: string,
    smooker: string,
    dominant_hand: string,
    details_job_oppotunity: string,
    evaluation: number,
    created_at: string
}

export interface JobApplicationDB {
    id: string,
    job_opportunity_id: string,
    user_id: string,
    status: APPLICATION_STATUS,
    created_at: string
}

export interface MessageDB {
    id: string,
    creator_id:string,
    company_id: string,
    user_id: string,
    content: string,
    created_at: string
}

export interface RatingCompanyDB {
    id: string,
    application_id: string,
    rating: number,
    message: string,
    created_at: string
}

export interface SiteRatingDB {
    id: string,
    company_id: string,
    rating: number,
    message: string,
    created_at: string
}

export interface UserCompleteDB {
    id: string,
    name: string,
    email: string,
    phone_number: number,
    birth_date: string,
    gender: string,
    nationality: string,
    marital_status: string,
    img: string,
    cep_number: number,
    city_id: string,
    city_name: string,
    neighborhood: string,
    apartment: string,
    availability_to_move: string,
    need_housing: string,
    need_transportation_to_move: string,
    height: number,
    weight: number,
    uniform_shirt: string,
    uniform_pants: string,
    glasses: string,
    dominant_hand: string,
    tatoo: string,
    piercing: string,
    smooker: string,
    driving_license: string,
    license_type: string,
    means_of_transport: string,
    grade_level: string,
    profissional_license: string,
    japanese_conversation_status: string,
    japanese_reading_status: string,
    japanese_visa_type: string,
    japanese_child_status: string,
    number_of_children: number,
    school_age: number
}

export interface UserCompleteModel {
    id: string,
    name: string,
    email: string,
    phone_number: number,
    birth_date: string,
    gender: string,
    nationality: string,
    marital_status: string,
    img: string,
    adress: {
        cep_number: number,
        city_name: string,
        neighborhood: string,
        apartment: string,
        can_move: {
            availability_to_move: string,
            need_housing: string,
            need_transportation_to_move: string,
            pet: string,
            pet_type: string
        }
    },
    measurement_detail: {
        height: number
        weight: number,
        uniform_shirt: string,
        uniform_pants: string
    },
    details: {
        glasses: string,
        dominant_hand: string,
        tatoo: string,
        piercing: string,
        smooker: string,
        driving_license: string,
        license_type: string,
        means_of_transport: string,
        grade_level: string,
        profissional_license: string,
        japanese_conversation_status: string,
        japanese_reading_status: string,
        japanese_visa_type: string,
        Japanese_child_status: string,
        chlid: {
            number: number,
            school_age: number
        }
    }

}


export interface UserModel {
    id: string,
    name: string,
    password: string,
    role: string,
    phoneNumber: string,
    birthDate: string,
    gender: string,
    nationality: string,
    maritalStatus: string,
    status: string,
    emailStatus: string,
    createdAt: string
}

// export interface RegionModel {
//     id: string,
//     name: string
// }

// export interface CityModel {
//     id: string,
//     region: string,
//     state_province_name: string,
//     city: string
// }

export interface LineOfBusinessModel {
    id: string,
    content: string,
    createdAt:string
}

export interface FunctionPerformedModel {
    id:string,
    lineOfBusines: string,
    content: string
    createdAt:string
}

export interface ProfissionalLicenseModel {
    id:string,
    content:string
    createdAt:string
}

export interface UserAdressModel{
    userId:string,
    id:string,
    cep:string,
    stateProvince:string,
    city:string,
    neighborhood: string,
    apartment:string,
    createdAt:string
}

export interface DrivingLicenseTypeModel {
    id:string,
    content:string,
    createdAt:string
}

export interface UserDetailModel {
    userId: string,
    drivingLicense: number,
    licenseTypeId: string,
    meansOfTransport: string,
    gradeLevel: string,
    profissionalLicenseId: string,
    japaneseConversationStatus: string,
    japaneseReadingStatus: string,
    japaneseDescentDegree: string,
    japaneseVisaType: string,
    japaneseChildStatus: string,
    childNumber: number,
    childSchoolAge: string,
    createdAt: string
}

export interface UserJobModel {
    userId: string,
    workingStatus: string,
    salaryClaim: string,
    startUpForecast: string,
    overtimeAvailability: string
}

export interface UserMeasurementDetailsModel {
    userId: string,
    height: string,
    weight: string,
    uniformShirt: string,
    uniformPants: string,
    dominantHand: string,
    glasses: number,
    tatoo: string,
    piercing: number,
    smooker: number,
    medicalTreatment: number,
    typeOfTreatment: string,
    createdAt: string
}

export interface MoveDisponibilityModel {
    userId: string,
    availabilityToMove: number,
    needHousing: number,
    needTransportationToMove: number,
    createdAt: string,
    pet: number,
    petType: string
}

export interface WorkHistoryModel {
    id: string,
    userId: string,
    companyName: string,
    factoryName: string,
    stateProvince: string,
    lineOfBusiness: string,
    startTime: string,
    endTime: string,
    functionPerformedId: string,
    reasonTermination: string,
    createdAt: string
}

export interface UserImgModel {
    userId: string,
    img: string,
    createdAt: string
}


export interface CompanyModel{
    id:string,
    responsableCompanyName:string,
    email:string,
    password:string,
    phoneNumber:string,
    cellPhoneNumber:string,
    role:string,
    status:string,
    emailStatus:string,
    createdAt:string
}

export interface CompanyAdressModel {
    id: string,
    companyId: string,
    cep: string,
    city: string,
    neighborhood: string,
    apartment: string,
    createdAt: string
}

export interface CompanyLogoModel {
    id: string,
    companyId: string,
    logoImg: string,
    createdAt: string
}

export interface JobOpportunityModel {
    id: string,
    companyId: string,
    functionPerformedId: string,
    city: string,
    cep:string,
    stateProvince:string,
    hourlyWage: string,
    shift: string,
    overtime: string,
    minAge: number,
    maxAge: number,
    japaneseCoversationStatus: number,
    japaneseReadingStatus: number,
    driverLicense: string,
    typeDriverLicense: string,
    profissionalLicenseId: string,
    minHeight: number,
    maxHeight: number,
    minWeight: number,
    maxWeight: number,
    minUniformSize: string,
    maxUniformSize: string,
    glass: string,
    tatoo: string,
    pircing: string,
    smooker: string,
    dominantHand: string,
    detailsJobOppotunity: string,
    evaluation: number,
    createdAt: string
}

export interface JobApplicationModel {
    id: string,
    jobOpportunityId: string,
    userId: string,
    status: APPLICATION_STATUS,
    createdAt: string
}

export enum APPLICATION_STATUS {
    APROVADO = "APROVADO",
    RECUSADO = "RECUSADO",
    ESPERA = "ESPERA"
}

export interface MessageModel {
    id: string,
    creatorId:string
    companyId: string,
    userId: string,
    content: string,
    createdAt: string
}

export interface RatingCompanyModel {
    id: string,
    applicationId: string,
    rating: number,
    message: string,
    createdAt: string
}

export interface SiteRatingModel {
    id: string,
    companyId: string,
    rating: number,
    message: string,
    createdAt: string
}