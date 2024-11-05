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
exports.default = seedUsers;
require("dotenv/config");
const chalk_1 = __importDefault(require("chalk"));
const registerUser_1 = require("../db/users/services/registerUser");
const adminMail = process.env.ADMIN_MAIL || "adminmail@mail.com";
const adminPass = process.env.ADMIN_PASS || "aB1!padtoEight";
const users = [
    {
        name: {
            first: "John",
            last: "Doe"
        },
        email: adminMail,
        password: adminPass,
        isAdmin: true
    },
    {
        name: {
            first: "Elizabeth",
            middle: "Middle Name",
            last: "Smith"
        },
        email: "example@gmail.com",
        password: "123!Abcd",
    },
    {
        name: {
            first: "Another",
            last: "User"
        },
        email: "test@example.com",
        password: "123!Abcd",
    }
];
function seedUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let admin;
            for (const user of users) {
                try {
                    const newUser = yield (0, registerUser_1.registerUser)(user);
                    admin || (admin = newUser);
                }
                catch (err) {
                    const error = err;
                    console.log(chalk_1.default.redBright(`Failed to add ${user.email}: ${error.message}`));
                }
            }
            if (admin) {
                return admin._id;
            }
            else {
                console.log(chalk_1.default.redBright(`Mongoose Error: Failed to create admin`));
            }
        }
        catch (err) {
            const error = err;
            console.log(chalk_1.default.redBright(`Mongoose Error: ${error.message}`));
        }
    });
}
