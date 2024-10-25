"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handleError_1 = __importDefault(require("../errors/handleError"));
const userRoutes_1 = require("./users/userRoutes");
const monsterCodexRoutes_1 = require("./monsterCodex/monsterCodexRoutes");
const router = (0, express_1.Router)();
router.use("/users", userRoutes_1.userRouter);
router.use("/monsters", monsterCodexRoutes_1.monsterCodexRouter);
router.use((req, res) => {
    (0, handleError_1.default)(res, 404, "Path not found");
});
exports.default = router;
