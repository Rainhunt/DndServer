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
exports.default = getUsers;
const createError_1 = __importDefault(require("../../../errors/createError"));
const User_1 = __importDefault(require("../schema/User"));
function getUsers(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (id) {
                const user = yield User_1.default.findById(id);
                if (user) {
                    return user;
                }
                else {
                    (0, createError_1.default)("Mongoose", "User not found", 404);
                }
            }
            else {
                return yield User_1.default.find();
            }
        }
        catch (err) {
            (0, createError_1.default)("Mongoose", "Internal Server Error", 500, err);
        }
    });
}
