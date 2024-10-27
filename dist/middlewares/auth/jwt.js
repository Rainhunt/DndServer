"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const createError_1 = __importDefault(require("../../errors/createError"));
const jsonwebtoken_1 = require("jsonwebtoken");
const handleError_1 = require("../../errors/handleError");
const jwtSecret = process.env.JWT_SECRET;
function verifyToken(token) {
    try {
        if (!jwtSecret) {
            (0, createError_1.default)("Server", "Internal Server Error", 500);
        }
        else {
            return (0, jsonwebtoken_1.verify)(token, jwtSecret);
        }
    }
    catch (err) {
        (0, createError_1.default)("Authentication", "Unauthorized User", 401, err);
    }
}
const jwtAuth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            (0, createError_1.default)("Authentication", "Please Log In", 401);
        }
        else {
            req.user = verifyToken(token);
            next();
        }
    }
    catch (err) {
        (0, handleError_1.catchError)(res, err);
    }
};
exports.default = jwtAuth;
