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
const mongoose_1 = require("mongoose");
const NameField_1 = __importDefault(require("../../schemas/NameField"));
const EmailField_1 = __importDefault(require("../../schemas/EmailField"));
const PasswordField_1 = __importDefault(require("../../schemas/PasswordField"));
const bcrypt_1 = require("bcrypt");
const userSchema = new mongoose_1.Schema({
    name: NameField_1.default,
    email: EmailField_1.default,
    password: PasswordField_1.default,
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            const salt = yield (0, bcrypt_1.genSalt)(10);
            this.password = yield (0, bcrypt_1.hash)(this.password, salt);
        }
    });
});
userSchema.methods.validatePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, bcrypt_1.compare)(password, this.password);
    });
};
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
