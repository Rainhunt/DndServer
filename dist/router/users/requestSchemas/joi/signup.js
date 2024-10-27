"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const signupJoiSchema = joi_1.default.object({
    name: joi_1.default.object().keys({
        first: joi_1.default.string().min(2).max(256).required(),
        middle: joi_1.default.string().min(2).max(256),
        last: joi_1.default.string().min(2).max(256).required(),
    }).required(),
    email: joi_1.default.string().ruleset.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .rule({ message: "You must provide a valid email" }).required(),
    password: joi_1.default.string().ruleset.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/)
        .rule({ message: "Your password must be 8-20 characters long, contain an uppercase and lowercase letter, a number, and a symbol (!@#$%^&*-)" })
        .required()
});
exports.default = signupJoiSchema;