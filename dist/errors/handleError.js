"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleError;
exports.catchError = catchError;
const chalk_1 = __importDefault(require("chalk"));
const createError_1 = require("./createError");
function handleError(res, status, message = "") {
    console.log(chalk_1.default.redBright(message));
    return res.status(status).send(message);
}
function catchError(res, err) {
    if (err instanceof createError_1.ServerError) {
        handleError(res, err.status || 400, err.message);
    }
    else {
        const error = err;
        handleError(res, 400, error.message);
    }
}
