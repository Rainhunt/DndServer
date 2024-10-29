"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberModifier = exports.stringModifier = void 0;
const mongoose_1 = require("mongoose");
const DefaultField_1 = __importDefault(require("../DefaultField"));
exports.stringModifier = new mongoose_1.Schema({
    value: DefaultField_1.default,
    source: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256
    }
});
exports.numberModifier = new mongoose_1.Schema({
    value: {
        type: Number,
        min: 0,
        max: 255
    },
    source: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256
    }
});
