"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
class Company {
    constructor(id, responsableCompanyName, email, password, phoneNumber, cellPhoneNumber, role, status, emailStatus, createdAt) {
        this.id = id;
        this.responsableCompanyName = responsableCompanyName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.cellPhoneNumber = cellPhoneNumber;
        this.role = role;
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
    getResponsableCompanyName() {
        return this.responsableCompanyName;
    }
    setResponsableCompanyName(value) {
        this.responsableCompanyName = value;
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
    getPhoneNumber() {
        return this.phoneNumber;
    }
    setPhoneNumber(value) {
        this.phoneNumber = value;
    }
    getCellPhoneNumber() {
        return this.cellPhoneNumber;
    }
    setCellPhoneNumber(value) {
        this.cellPhoneNumber = value;
    }
    getRole() {
        return this.role;
    }
    setRole(value) {
        this.role = value;
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
            responsible_company_name: this.responsableCompanyName,
            email: this.email,
            password: this.password,
            phone_number: this.phoneNumber,
            cell_phone_number: this.cellPhoneNumber,
            role: this.role,
            status: this.status,
            email_status: this.emailStatus,
            created_at: this.createdAt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            responsableCompanyName: this.responsableCompanyName,
            email: this.email,
            password: this.password,
            phoneNumber: this.phoneNumber,
            cellPhoneNumber: this.cellPhoneNumber,
            role: this.role,
            status: this.status,
            emailStatus: this.emailStatus,
            createdAt: this.createdAt
        };
    }
}
exports.Company = Company;
