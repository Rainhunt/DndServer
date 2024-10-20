"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("./middlewares/cors"));
const logger_1 = __importDefault(require("./services/logger"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8181;
app.use(cors_1.default);
app.use(express_1.default.json());
app.use(logger_1.default);
app.use(express_1.default.static("./public"));
app.get("/", (req, res) => {
    res.send("Response from Server");
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
