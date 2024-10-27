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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
const createError_1 = __importDefault(require("../../../errors/createError"));
const auth_1 = require("../../../services/auth");
const User_1 = __importDefault(require("../schema/User"));
function loginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.findOne({ email });
            if (!user || !(yield user.validatePassword(password))) {
                (0, createError_1.default)("Authentication", "Invalid email or password", 401);
            }
            else {
                return (0, auth_1.tokenGenerator)(user);
            }
        }
        catch (err) {
            (0, createError_1.default)("Authentication", "Failed to log in user", 500, err);
        }
    });
}
