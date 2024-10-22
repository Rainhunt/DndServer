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
exports.monsterCodexRouter = void 0;
const express_1 = require("express");
const handleError_1 = __importDefault(require("../errors/handleError"));
const createError_1 = require("../errors/createError");
const router = (0, express_1.Router)();
exports.monsterCodexRouter = router;
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            (0, handleError_1.default)(res, 403, "You must be logged in to create a new monster");
        }
        else {
            res.status(200).send("Congratulations! You created a new monster!");
        }
    }
    catch (err) {
        if (err instanceof createError_1.ServerError) {
            (0, handleError_1.default)(res, err.status || 400, err.message);
        }
        else {
            const error = err;
            (0, handleError_1.default)(res, 400, error.message);
        }
    }
}));
