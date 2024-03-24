"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMeasurementDetails = void 0;
class UserMeasurementDetails {
    constructor(userId, height, weight, uniformShirt, uniformPants, dominantHand, glasses, tatoo, piercing, smooker, medicalTreatment, typeOfTreatment, createdAt) {
        this.userId = userId;
        this.height = height;
        this.weight = weight;
        this.uniformShirt = uniformShirt;
        this.uniformPants = uniformPants;
        this.dominantHand = dominantHand;
        this.glasses = glasses;
        this.tatoo = tatoo;
        this.piercing = piercing;
        this.smooker = smooker;
        this.medicalTreatment = medicalTreatment;
        this.typeOfTreatment = typeOfTreatment;
        this.createdAt = createdAt;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
    getHeight() {
        return this.height;
    }
    setHeight(value) {
        this.height = value;
    }
    getWeight() {
        return this.weight;
    }
    setWeight(value) {
        this.weight = value;
    }
    getUniformShirt() {
        return this.uniformShirt;
    }
    setUniformShirt(value) {
        this.uniformShirt = value;
    }
    getUniformPants() {
        return this.uniformPants;
    }
    setUniformPants(value) {
        this.uniformPants = value;
    }
    getDominantHand() {
        return this.dominantHand;
    }
    setDominantHand(value) {
        this.dominantHand = value;
    }
    getGlasses() {
        return this.glasses;
    }
    setGlasses(value) {
        this.glasses = value;
    }
    getTatoo() {
        return this.tatoo;
    }
    setTatoo(value) {
        this.tatoo = value;
    }
    getPiercing() {
        return this.piercing;
    }
    setPiercing(value) {
        this.piercing = value;
    }
    getSmooker() {
        return this.smooker;
    }
    setSmooker(value) {
        this.smooker = value;
    }
    getMedicalTreatment() {
        return this.medicalTreatment;
    }
    getTypeOfTreatment() {
        return this.typeOfTreatment;
    }
    setTypeOfTreatment(value) {
        this.typeOfTreatment = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    toDBModel() {
        return {
            user_id: this.userId,
            height: this.height,
            weight: this.weight,
            uniform_shirt: this.uniformShirt,
            uniform_pants: this.uniformPants,
            dominant_hand: this.dominantHand,
            glasses: this.glasses,
            tatoo: this.tatoo,
            piercing: this.piercing,
            smooker: this.smooker,
            medical_treatment: this.medicalTreatment,
            type_of_treatment: this.typeOfTreatment,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            userId: this.userId,
            height: this.height,
            weight: this.weight,
            uniformShirt: this.uniformShirt,
            uniformPants: this.uniformPants,
            dominantHand: this.dominantHand,
            glasses: this.glasses,
            tatoo: this.tatoo,
            piercing: this.piercing,
            smooker: this.smooker,
            medicalTreatment: this.medicalTreatment,
            typeOfTreatment: this.typeOfTreatment,
            createdAt: this.createdAt
        };
    }
}
exports.UserMeasurementDetails = UserMeasurementDetails;
