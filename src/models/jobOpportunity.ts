import { JobOpportunityDB, JobOpportunityModel } from "../Types";

export class JobOpportunity {
    constructor(
        private id: string,
        private companyId: string,
        private functionPerformedId: string,
        private city: string,
        private cep:string,
        private stateProvince:string,
        private hourlyWage: string,
        private shift: string,
        private overtime: string,
        private minAge: number,
        private maxAge: number,
        private japaneseCoversationStatus: number,
        private japaneseReadingStatus: number,
        private driverLicense: string,
        private typeDriverLicense: string,
        private profissionalLicenseId: string,
        private minHeight: number,
        private maxHeight: number,
        private minWeight: number,
        private maxWeight: number,
        private minUniformSize: string,
        private maxUniformSize: string,
        private glass: string,
        private tatoo: string,
        private pircing: string,
        private smooker: string,
        private dominantHand: string,
        private detailsJobOppotunity: string,
        private evaluation: number,
        private createdAt: string
    ) { }

    public toDBModel():JobOpportunityDB{
        return{
            id:this.id,
            company_id:this.companyId,
            function_performed_id:this.functionPerformedId,
            city:this.city,
            cep:this.cep,
            state_province:this.stateProvince,
            hourly_wage:this.hourlyWage,
            shift:this.shift,
            overtime:this.overtime,
            min_age:this.minAge,
            max_age:this.maxAge,
            japanese_coversation_status:this.japaneseCoversationStatus,
            japanese_reading_status:this.japaneseReadingStatus,
            driver_license:this.driverLicense,
            type_driver_license:this.typeDriverLicense,
            profissional_license_id:this.profissionalLicenseId,
            min_height:this.minHeight,
            max_height:this.maxHeight,
            min_weight:this.minWeight,
            max_weight:this.maxWeight,
            min_uniform_size:this.minUniformSize,
            max_uniform_size:this.maxUniformSize,
            glass:this.glass,
            tatoo:this.tatoo,
            pircing:this.pircing,
            smooker:this.smooker,
            dominant_hand:this.dominantHand,
            details_job_oppotunity:this.detailsJobOppotunity,
            evaluation:this.evaluation,
            created_at:this.createdAt
        }
    }

    public toBusinessModel():JobOpportunityModel{
        return{
            id:this.id,
            companyId:this.companyId,
            functionPerformedId:this.functionPerformedId,
            city:this.city,
            cep:this.cep,
            stateProvince:this.stateProvince,
            hourlyWage:this.hourlyWage,
            shift:this.shift,
            overtime:this.overtime,
            minAge:this.minAge,
            maxAge:this.maxAge,
            japaneseCoversationStatus:this.japaneseCoversationStatus,
            japaneseReadingStatus:this.japaneseReadingStatus,
            driverLicense:this.driverLicense,
            typeDriverLicense:this.typeDriverLicense,
            profissionalLicenseId:this.profissionalLicenseId,
            minHeight:this.minHeight,
            maxHeight:this.maxHeight,
            minWeight:this.minWeight,
            maxWeight:this.maxWeight,
            minUniformSize:this.minUniformSize,
            maxUniformSize:this.maxUniformSize,
            glass:this.glass,
            tatoo:this.tatoo,
            pircing:this.pircing,
            smooker:this.smooker,
            dominantHand:this.dominantHand,
            detailsJobOppotunity:this.detailsJobOppotunity,
            evaluation:this.evaluation,
            createdAt:this.createdAt
        }
    }
}