"use strict";
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
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
