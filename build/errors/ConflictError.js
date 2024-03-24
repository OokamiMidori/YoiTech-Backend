"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
const BaseError_1 = require("./BaseError");
class ConflictError extends BaseError_1.BaseError {
    constructor(message = "Já existe um recurso com esse identificador") {
        super(409, message);
    }
}
exports.ConflictError = ConflictError;
