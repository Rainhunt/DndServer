"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const morgan_1 = __importDefault(require("morgan"));
const morganLogger = (0, morgan_1.default)((tokens, req, res) => {
    const t = new Date();
    const log = [
        `[${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}]`,
        `${tokens.method(req, res)} ${tokens.url(req, res)}`,
        tokens.status(req, res),
        `${tokens["response-time"](req, res)} ms`,
    ].join(" | ");
    if (res.statusCode >= 400) {
        return chalk_1.default.redBright(log);
    }
    else {
        return chalk_1.default.cyanBright(log);
    }
});
exports.default = morganLogger;
