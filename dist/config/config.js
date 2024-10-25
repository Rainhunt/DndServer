"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const defaultConfig = {
    LOGGER: "morgan",
    SCHEMA_VALIDATOR: "joi"
};
const config = Object.assign(Object.assign({}, defaultConfig), config_1.default);
exports.default = config;
