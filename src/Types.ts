export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
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
    phone_number: number,
    birth_date: number,
    gender: string,
    nationality: string,
    marital_status: string,
    status: number,
    crated_at: string
}

export interface RegionDB {
    id: string,
    name: string
}

export interface StateProvinceDB {
    id: string,
    region_id: string,
    name: string
}

export interface StateProvinceWithRegionDB extends StateProvinceDB {
    region_name: string
}

export interface CityDB {
    id: string,
    state_province_id: string,
    name: string
}

export interface CityWhithStateProvinceAndRegionDB extends CityDB {
    state_province_name: string,
    region_name: string
}

export interface LineOfBusinessDB {
    id: string,
    content: string
}

export interface FunctionPerformedDB {
    id: string,
    line_of_business_id: string,
    content: string
}

export interface FunctionPerformedWithLineOfBusinessDB extends FunctionPerformedDB {
    line_of_business_name: string
}

export interface ProfissionalLicenseDB {
    id: string,
    content: string
}

export interface UserAdressDB {
    user_id: string,
    cep: number,
    city_id: string,
    neighborhood: string,
    apartment: string,
    created_at: string
}

export interface UserAdressWithCityDB extends UserAdressDB {
    city_name: string
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
    japenese_conversation_status: number,
    japenese_reading_status: string,
    japenese_descent_degree: string,
    japenese_visa_type: string,
    japenese_child_status: string,
    child_number: number,
    child_school_age: number,
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
    shirt: string,
    wight: number,
    uniform_shirt: string,
    uniform_pants: string,
    dominant_hand: number,
    glasses: number,
    tatoo: string,
    piercing: number,
    smooker: number,
    pet: number,
    pet_type: string,
    medical_treatment: number,
    type_of_treatment: string,
    created_at: string
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
    phone_number: number,
    cell_phone_number: number,
    created_at: string
}

export interface CompanyAdressDB {
    id: string,
    company_id: string,
    cep: number,
    city_id: string,
    neighborhood: string,
    apartment: string,
    created_at: string
}

export interface CompanyLogo {
    id: string,
    company_id: string,
    logo_img: string,
    created_at: string
}

export interface JobOpportunityDB {
    id: string,
    company_id: string,
    function_performed_id: string,
    city_id: string,
    hourly_wage: string,
    shift: string,
    overtime: number,
    min_age: number,
    max_age: number,
    japanese_coversation_status: number,
    japanese_reading_status: number,
    driver_license: number,
    type_driver_license: string,
    profissional_license_id: string,
    min_height: number,
    max_haieght: number,
    min_weight: number,
    max_weight: number,
    min_uniform_size: string,
    max_uniform_size: string,
    glass: number,
    tatoo: string,
    pircing: number,
    smooker: number,
    dominant_hand: number,
    details_job_oppotunity: string,
    evaluation: number,
    created_at: string
}

export interface JobApplicationDB {
    id: string,
    job_opportunity_id: string,
    user_id: string,
    status: number,
    created_at: string
}

export interface MessageDB {
    id: string,
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