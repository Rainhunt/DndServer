"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegistrationBody = validateRegistrationBody;
exports.validateLoginBody = validateLoginBody;
exports.validateEditUserBody = validateEditUserBody;
const config_1 = __importDefault(require("../../Config/config"));
const editUser_1 = __importDefault(require("./requestSchemas/joi/editUser"));
const login_1 = __importDefault(require("./requestSchemas/joi/login"));
const signup_1 = __importDefault(require("./requestSchemas/joi/signup"));
const validatorType = config_1.default.SCHEMA_VALIDATOR;
function validateRegistrationBody(user) {
    var _a;
    switch (validatorType) {
        case "joi":
        default:
            return (_a = signup_1.default.validate(user).error) === null || _a === void 0 ? void 0 : _a.details[0].message;
    }
}
function validateLoginBody(user) {
    var _a;
    switch (validatorType) {
        case "joi":
        default:
            return (_a = login_1.default.validate(user).error) === null || _a === void 0 ? void 0 : _a.details[0].message;
    }
}
function validateEditUserBody(user) {
    var _a;
    switch (validatorType) {
        case "joi":
        default:
            return (_a = editUser_1.default.validate(user).error) === null || _a === void 0 ? void 0 : _a.details[0].message;
    }
}
