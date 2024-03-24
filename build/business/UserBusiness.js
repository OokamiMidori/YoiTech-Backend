"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const Types_1 = require("../Types");
const BadRequestError_1 = require("../errors/BadRequestError");
const NotFoundError_1 = require("../errors/NotFoundError");
const User_1 = require("../models/User");
class UserBusiness {
    constructor(userDatabase, idGenerator, tokenManager, hashManager) {
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.hashManager = hashManager;
        this.signup = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, phoneNumber, birthDate, gender, maritalStatus, nationality } = input;
            if (typeof name !== "string") {
                throw new BadRequestError_1.BadRequestError("'name' deve ser string");
            }
            if (typeof email !== "string") {
                throw new BadRequestError_1.BadRequestError("'email' deve ser string");
            }
            if (typeof password !== "string") {
                throw new BadRequestError_1.BadRequestError("'password' deve ser string");
            }
            if (typeof phoneNumber !== "string") {
                throw new BadRequestError_1.BadRequestError("'phoneNumber' deve ser string");
            }
            if (typeof birthDate !== "string") {
                throw new BadRequestError_1.BadRequestError("'birthDate' deve ser string");
            }
            if (typeof gender !== "string") {
                throw new BadRequestError_1.BadRequestError("'gender' deve ser string");
            }
            if (typeof maritalStatus !== "string") {
                throw new BadRequestError_1.BadRequestError("'maritalStatus' deve ser string");
            }
            if (typeof nationality !== "string") {
                throw new BadRequestError_1.BadRequestError("'nationality' deve ser string");
            }
            // console.log("Até aqui foi")
            const id = this.idGenerator.generate();
            const hashedPassword = yield this.hashManager.hash(password);
            const role = Types_1.USER_ROLES.NORMAL;
            const emailStatus = Types_1.EMAIL_STATUS.INATIVO;
            const status = Types_1.STATUS_USER_COMPANY.ATIVO;
            const createdAt = new Date().toISOString();
            const newUser = new User_1.User(id, name, email, hashedPassword, role, phoneNumber, birthDate, gender, nationality, maritalStatus, status, emailStatus, createdAt);
            const userDB = newUser.toDBModel();
            yield this.userDatabase.insert(userDB);
            const payload = {
                id: newUser.getId(),
                name: newUser.getName(),
                role: newUser.getRole()
            };
            const token = this.tokenManager.createToken(payload);
            const output = {
                token
            };
            return output;
        });
        this.Login = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            if (typeof email !== "string") {
                throw new BadRequestError_1.BadRequestError("'email' deve ser string");
            }
            if (typeof password !== "string") {
                throw new BadRequestError_1.BadRequestError("'password' deve ser string");
            }
            const userDB = yield this.userDatabase.findByEmail(email);
            if (!userDB) {
                throw new NotFoundError_1.NotFoundError("'email' e/ou 'senha' inválido(s)");
            }
            const user = new User_1.User(userDB.id, userDB.name, userDB.email, userDB.password, userDB.role, userDB.phone_number, userDB.birth_date, userDB.gender, userDB.nationality, userDB.marital_status, userDB.status, userDB.email_status, userDB.created_at);
            const hashedPassword = user.getPassword();
            const isPasswordCorrect = yield this.hashManager.compare(password, hashedPassword);
            if (!isPasswordCorrect) {
                throw new BadRequestError_1.BadRequestError("'email' e/ou 'senha' inválido(s)");
            }
            const payload = {
                id: user.getId(),
                name: user.getName(),
                role: user.getRole()
            };
            const token = this.tokenManager.createToken(payload);
            const output = {
                token
            };
            return output;
        });
        this.emailActivation = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, confirmation, token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (email !== "string") {
                throw new BadRequestError_1.BadRequestError("'email' deve ser uma string");
            }
            if (confirmation !== "boolean") {
                throw new BadRequestError_1.BadRequestError("'confirmation' deve ser boolean");
            }
            const user = yield this.userDatabase.findByEmail(email);
            if (!user) {
                throw new BadRequestError_1.BadRequestError("'email' não encontrado");
            }
            const userId = payload.id;
            const emailStatus = confirmation ? 1 : 0;
            const role = Types_1.EMAIL_STATUS.ATIVO;
            const UserConfirmed = new User_1.User(user.id, user.name, user.email, user.password, user.role, user.phone_number, user.birth_date, user.gender, user.nationality, user.marital_status, user.status, role, user.created_at);
            const updatedUserDB = UserConfirmed.toDBModel();
            yield this.userDatabase.updateUser(user.id, updatedUserDB);
        });
        this.signupAdmin = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, phoneNumber, birthDate, gender, maritalStatus, nationality } = input;
            if (typeof name !== "string") {
                throw new BadRequestError_1.BadRequestError("'name' deve ser string");
            }
            if (typeof email !== "string") {
                throw new BadRequestError_1.BadRequestError("'email' deve ser string");
            }
            if (typeof password !== "string") {
                throw new BadRequestError_1.BadRequestError("'password' deve ser string");
            }
            if (typeof phoneNumber !== "string") {
                throw new BadRequestError_1.BadRequestError("'phoneNumber' deve ser string");
            }
            if (typeof birthDate !== "string") {
                throw new BadRequestError_1.BadRequestError("'birthDate' deve ser string");
            }
            if (typeof gender !== "string") {
                throw new BadRequestError_1.BadRequestError("'gender' deve ser string");
            }
            if (typeof maritalStatus !== "string") {
                throw new BadRequestError_1.BadRequestError("'maritalStatus' deve ser string");
            }
            if (typeof nationality !== "string") {
                throw new BadRequestError_1.BadRequestError("'nationality' deve ser string");
            }
            const id = this.idGenerator.generate();
            const hashedPassword = yield this.hashManager.hash(password);
            const role = Types_1.USER_ROLES.ADMIN;
            const emailStatus = Types_1.EMAIL_STATUS.INATIVO;
            const status = Types_1.STATUS_USER_COMPANY.ATIVO;
            const createdAt = new Date().toISOString();
            const newUser = new User_1.User(id, name, email, hashedPassword, role, phoneNumber, birthDate, gender, nationality, maritalStatus, status, emailStatus, createdAt);
            const userDB = newUser.toDBModel();
            yield this.userDatabase.insert(userDB);
            const payload = {
                id: newUser.getId(),
                name: newUser.getName(),
                role: newUser.getRole()
            };
            const token = this.tokenManager.createToken(payload);
            const output = {
                token
            };
            return output;
        });
        this.getUser = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, idToGet } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'token' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (typeof idToGet !== "string") {
                throw new BadRequestError_1.BadRequestError("'idToGet' deve ser string");
            }
            const userDB = yield this.userDatabase.findById(idToGet);
            if (!userDB) {
                throw new BadRequestError_1.BadRequestError("idToGet inválido");
            }
            const user = new User_1.User(userDB.id, userDB.name, userDB.email, userDB.password, userDB.role, userDB.phone_number, userDB.birth_date, userDB.gender, userDB.nationality, userDB.marital_status, userDB.status, userDB.email_status, userDB.created_at);
            const userBusiness = user.toBusinessModel();
            return userBusiness;
        });
    }
}
exports.UserBusiness = UserBusiness;
