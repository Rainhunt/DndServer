"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateJwtToken;
require("dotenv/config");
const jsonwebtoken_1 = require("jsonwebtoken");
const createError_1 = __importDefault(require("../errors/createError"));
const jwtSecret = process.env.JWT_SECRET;
function generateJwtToken(user) {
    try {
        if (!jwtSecret) {
            (0, createError_1.default)("Server", "Internal Server Error", 500);
        }
        else {
            const payload = {
                _id: user._id,
                isAdmin: user.isAdmin
            };
            return (0, jsonwebtoken_1.sign)(payload, jwtSecret);
        }
    }
    catch (err) {
        (0, createError_1.default)("Server", "Failed to Serialize Token", 400, err);
    }
}
