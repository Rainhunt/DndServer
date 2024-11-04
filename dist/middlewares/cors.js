"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const origins = ((_a = process.env.CORS_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(",")) || ["http://localhost:8181"];
const corsOrigins = (0, cors_1.default)({
    origin: origins
});
exports.default = corsOrigins;
