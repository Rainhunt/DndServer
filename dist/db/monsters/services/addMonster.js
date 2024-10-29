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
exports.addMonster = addMonster;
const createError_1 = __importDefault(require("../../../errors/createError"));
const Monster_1 = __importDefault(require("../schema/Monster"));
function addMonster(newMonster) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let monster = new Monster_1.default(newMonster);
            console.log("here2");
            monster = yield monster.save();
            console.log("here3");
            return monster;
        }
        catch (err) {
            console.log("here4");
            if (err instanceof Error) {
                (0, createError_1.default)("Mongoose", err.message, 409);
            }
            else {
                console.log(err);
                (0, createError_1.default)("Mongoose", "unknown", 500);
            }
        }
    });
}
