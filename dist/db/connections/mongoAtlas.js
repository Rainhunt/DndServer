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
exports.default = connectToMongoAtlas;
require("dotenv/config");
const chalk_1 = __importDefault(require("chalk"));
const mongoose_1 = require("mongoose");
function connectToMongoAtlas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.MONGO_ATLAS_CONNECTION_STRING) {
                yield (0, mongoose_1.connect)(process.env.MONGO_ATLAS_CONNECTION_STRING);
                console.log(chalk_1.default.greenBright("Connected to MongoDB in Atlas"));
            }
            else {
                console.log(chalk_1.default.redBright("Mongo connection string undefined"));
            }
        }
        catch (err) {
            console.log(chalk_1.default.redBright("Could not connect to MongoDB"));
        }
    });
}
