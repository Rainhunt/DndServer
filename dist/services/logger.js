"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../Config/config"));
const morgan_1 = __importDefault(require("../middlewares/loggers/morgan"));
const logType = config_1.default.LOGGER;
function getLogger(logType) {
    switch (logType) {
        case "morgan":
        default:
            return morgan_1.default;
    }
}
const logger = getLogger(logType);
exports.default = logger;
