"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DefaultField_1 = __importDefault(require("./DefaultField"));
const nameField = new mongoose_1.Schema({
    first: DefaultField_1.default,
    middle: Object.assign(Object.assign({}, DefaultField_1.default), { required: false, minlength: 0 }),
    last: DefaultField_1.default
});
exports.default = nameField;
