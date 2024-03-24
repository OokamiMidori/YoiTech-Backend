"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, email, password, role, phoneNumber, birthDate, gender, nationality, maritalStatus, status, emailStatus, createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.gender = gender;
        this.nationality = nationality;
        this.maritalStatus = maritalStatus;
        this.status = status;
        this.emailStatus = emailStatus;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getName() {
        return this.name;
    }
    setName(value) {
        this.name = value;
    }
    getEmail() {
        return this.email;
    }
    setEmail(value) {
        this.email = value;
    }
    getPassword() {
        return this.password;
    }
    setPassword(value) {
        this.password = value;
    }
    getRole() {
        return this.role;
    }
    setRole(value) {
        this.role = value;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    setPhoneNumber(value) {
        this.phoneNumber = value;
    }
    getBirthDate() {
        return this.birthDate;
    }
    setBirthDate(value) {
        this.birthDate = value;
    }
    getGender() {
        return this.gender;
    }
    setGender(value) {
        this.gender = value;
    }
    getNationality() {
        return this.nationality;
    }
    setNationality(value) {
        this.nationality = value;
    }
    getMaritalStatus() {
        return this.maritalStatus;
    }
    setMaritalStatus(value) {
        this.maritalStatus = value;
    }
    getStatus() {
        return this.status;
    }
    setStatus(value) {
        this.status = value;
    }
    getEmailStatus() {
        return this.emailStatus;
    }
    setEmailStatus(value) {
        this.emailStatus = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    toDBModel() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            phone_number: this.phoneNumber,
            birth_date: this.birthDate,
            gender: this.gender,
            nationality: this.nationality,
            marital_status: this.maritalStatus,
            status: this.status,
            email_status: this.emailStatus,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            name: this.name,
            password: this.password,
            role: this.role,
            phoneNumber: this.phoneNumber,
            birthDate: this.birthDate,
            gender: this.gender,
            nationality: this.nationality,
            maritalStatus: this.maritalStatus,
            status: this.status,
            emailStatus: this.emailStatus,
            createdAt: this.createdAt
        };
    }
}
exports.User = User;
