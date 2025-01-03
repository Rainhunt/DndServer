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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("./middlewares/cors"));
const logger_1 = __importDefault(require("./services/logger"));
const handleError_1 = __importDefault(require("./errors/handleError"));
const router_1 = __importDefault(require("./router/router"));
const db_1 = __importDefault(require("./services/db"));
const chalk_1 = __importDefault(require("chalk"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8181;
app.use(cors_1.default);
app.use(express_1.default.json());
app.use(logger_1.default);
app.use(express_1.default.static("./public"));
app.use(router_1.default);
app.use((err, req, res, next) => {
    (0, handleError_1.default)(res, 500, err.message || "Internal Server Error");
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(chalk_1.default.blueBright(`Server is running at http://localhost:${port}`));
    yield (0, db_1.default)();
}));
