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
const db_1 = __importDefault(require("../services/db"));
const monsters_1 = __importDefault(require("./monsters"));
const users_1 = __importDefault(require("./users"));
const chalk_1 = __importDefault(require("chalk"));
function seedDB() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.default)();
        let admin = yield (0, users_1.default)();
        if (admin) {
            yield (0, monsters_1.default)(admin);
        }
        else {
            console.log(chalk_1.default.redBright("Failed to seed monsters: failed to seed admin user"));
        }
        (0, mongoose_1.disconnect)();
    });
}
seedDB();
