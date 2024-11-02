"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.monsterCodexRouter = void 0;
const express_1 = require("express");
const handleError_1 = __importStar(require("../../errors/handleError"));
const auth_1 = __importDefault(require("../../services/auth"));
const addMonster_1 = require("../../db/monsters/services/addMonster");
const requestValidators_1 = require("./requestValidators");
const mapNewMonster_1 = require("./requestSchemas/joi/mapNewMonster");
const router = (0, express_1.Router)();
exports.monsterCodexRouter = router;
router.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            (0, handleError_1.default)(res, 403, "You must be logged in to create a new monster");
        }
        else {
            const schemaError = (0, requestValidators_1.validateNewMonsterBody)(req.body);
            if (schemaError) {
                (0, handleError_1.default)(res, 400, schemaError);
            }
            else {
                let monster = (0, mapNewMonster_1.mapNewMonster)(req.body);
                monster = yield (0, addMonster_1.addMonster)(monster);
                res.send(monster);
            }
        }
    }
    catch (err) {
        (0, handleError_1.catchError)(res, err);
    }
}));
