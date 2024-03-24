import { EMAIL_STATUS, STATUS_USER_COMPANY, USER_ROLES, UserDB, UserModel } from "../Types";

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES,
        private phoneNumber: string,
        private birthDate: string,
        private gender: string,
        private nationality: string,
        private maritalStatus: string,
        private status: STATUS_USER_COMPANY,
        private emailStatus: EMAIL_STATUS,
        private createdAt: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getName(): string {
        return this.name
    }

    public setName(value: string): void {
        this.name = value
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(value: string): void {
        this.email = value
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(value: string): void {
        this.password = value
    }

    public getRole(): USER_ROLES {
        return this.role
    }

    public setRole(value: USER_ROLES): void {
        this.role = value
    }

    public getPhoneNumber(): string {
        return this.phoneNumber
    }

    public setPhoneNumber(value:string):void{
        this.phoneNumber = value
    }

    public getBirthDate ():string{
        return this.birthDate
    }

    public setBirthDate (value:string):void{
        this.birthDate = value
    }

    public getGender():string{
        return this.gender
    }

    public setGender(value:string):void{
        this.gender = value
    }

    public getNationality():string{
        return this.nationality
    }

    public setNationality (value:string):void{
        this.nationality = value
    }

    public getMaritalStatus () :string{
        return this.maritalStatus
    }

    public setMaritalStatus (value:string):void{
        this.maritalStatus = value
    }

    public getStatus ():STATUS_USER_COMPANY{
        return this.status
    }

    public setStatus (value:STATUS_USER_COMPANY):void{
        this.status = value
    }

    public getEmailStatus ():EMAIL_STATUS{
        return this.emailStatus
    }

    public setEmailStatus(value:EMAIL_STATUS):void{
        this.emailStatus = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public toDBModel(): UserDB{
        return{
            id: this.id ,
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
        }
    }

    public toBusinessModel (): UserModel {
        return{
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
        }
    }
}