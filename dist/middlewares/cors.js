"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const corsOrigins = (0, cors_1.default)({
    origin: [
        "http://localhost:8181"
    ]
});
exports.default = corsOrigins;
