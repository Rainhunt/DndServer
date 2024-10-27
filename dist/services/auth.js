"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenGenerator = void 0;
const config_1 = __importDefault(require("../Config/config"));
const jwt_1 = __importDefault(require("../middlewares/auth/jwt"));
const jwt_2 = __importDefault(require("../auth/jwt"));
const authType = config_1.default.AUTH;
function getTokenGenerator(authType) {
    switch (authType) {
        case "jwt":
        default:
            return jwt_2.default;
    }
}
function getAuth(authType) {
    switch (authType) {
        case "jwt":
        default:
            return jwt_1.default;
    }
}
const auth = getAuth(authType);
exports.tokenGenerator = getTokenGenerator(authType);
exports.default = auth;
