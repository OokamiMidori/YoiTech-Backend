"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobOpportunity = void 0;
class JobOpportunity {
    constructor(id, companyId, functionPerformedId, city, cep, stateProvince, hourlyWage, shift, overtime, minAge, maxAge, japaneseCoversationStatus, japaneseReadingStatus, driverLicense, typeDriverLicense, profissionalLicenseId, minHeight, maxHeight, minWeight, maxWeight, minUniformSize, maxUniformSize, glass, tatoo, pircing, smooker, dominantHand, detailsJobOppotunity, evaluation, createdAt) {
        this.id = id;
        this.companyId = companyId;
        this.functionPerformedId = functionPerformedId;
        this.city = city;
        this.cep = cep;
        this.stateProvince = stateProvince;
        this.hourlyWage = hourlyWage;
        this.shift = shift;
        this.overtime = overtime;
        this.minAge = minAge;
        this.maxAge = maxAge;
        this.japaneseCoversationStatus = japaneseCoversationStatus;
        this.japaneseReadingStatus = japaneseReadingStatus;
        this.driverLicense = driverLicense;
        this.typeDriverLicense = typeDriverLicense;
        this.profissionalLicenseId = profissionalLicenseId;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.minWeight = minWeight;
        this.maxWeight = maxWeight;
        this.minUniformSize = minUniformSize;
        this.maxUniformSize = maxUniformSize;
        this.glass = glass;
        this.tatoo = tatoo;
        this.pircing = pircing;
        this.smooker = smooker;
        this.dominantHand = dominantHand;
        this.detailsJobOppotunity = detailsJobOppotunity;
        this.evaluation = evaluation;
        this.createdAt = createdAt;
    }
    toDBModel() {
        return {
            id: this.id,
            company_id: this.companyId,
            function_performed_id: this.functionPerformedId,
            city: this.city,
            cep: this.cep,
            state_province: this.stateProvince,
            hourly_wage: this.hourlyWage,
            shift: this.shift,
            overtime: this.overtime,
            min_age: this.minAge,
            max_age: this.maxAge,
            japanese_coversation_status: this.japaneseCoversationStatus,
            japanese_reading_status: this.japaneseReadingStatus,
            driver_license: this.driverLicense,
            type_driver_license: this.typeDriverLicense,
            profissional_license_id: this.profissionalLicenseId,
            min_height: this.minHeight,
            max_height: this.maxHeight,
            min_weight: this.minWeight,
            max_weight: this.maxWeight,
            min_uniform_size: this.minUniformSize,
            max_uniform_size: this.maxUniformSize,
            glass: this.glass,
            tatoo: this.tatoo,
            pircing: this.pircing,
            smooker: this.smooker,
            dominant_hand: this.dominantHand,
            details_job_oppotunity: this.detailsJobOppotunity,
            evaluation: this.evaluation,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            companyId: this.companyId,
            functionPerformedId: this.functionPerformedId,
            city: this.city,
            cep: this.cep,
            stateProvince: this.stateProvince,
            hourlyWage: this.hourlyWage,
            shift: this.shift,
            overtime: this.overtime,
            minAge: this.minAge,
            maxAge: this.maxAge,
            japaneseCoversationStatus: this.japaneseCoversationStatus,
            japaneseReadingStatus: this.japaneseReadingStatus,
            driverLicense: this.driverLicense,
            typeDriverLicense: this.typeDriverLicense,
            profissionalLicenseId: this.profissionalLicenseId,
            minHeight: this.minHeight,
            maxHeight: this.maxHeight,
            minWeight: this.minWeight,
            maxWeight: this.maxWeight,
            minUniformSize: this.minUniformSize,
            maxUniformSize: this.maxUniformSize,
            glass: this.glass,
            tatoo: this.tatoo,
            pircing: this.pircing,
            smooker: this.smooker,
            dominantHand: this.dominantHand,
            detailsJobOppotunity: this.detailsJobOppotunity,
            evaluation: this.evaluation,
            createdAt: this.createdAt
        };
    }
}
exports.JobOpportunity = JobOpportunity;
