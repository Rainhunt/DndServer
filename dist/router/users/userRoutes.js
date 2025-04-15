"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userRouter = void 0;
const express_1 = require("express");
const handleError_1 = __importStar(require("../../errors/handleError"));
const requestValidators_1 = require("./requestValidators");
const registerUser_1 = require("../../db/users/services/registerUser");
const lodash_1 = __importDefault(require("lodash"));
const loginUser_1 = require("../../db/users/services/loginUser");
const auth_1 = __importDefault(require("../../services/auth"));
const createError_1 = __importDefault(require("../../errors/createError"));
const getUsers_1 = __importDefault(require("../../db/users/services/getUsers"));
const editUser_1 = __importDefault(require("../../db/users/services/editUser"));
const deleteUser_1 = __importDefault(require("../../db/users/services/deleteUser"));
const router = (0, express_1.Router)();
exports.userRouter = router;
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schemaError = (0, requestValidators_1.validateRegistrationBody)(req.body);
        if (schemaError) {
            (0, handleError_1.default)(res, 400, schemaError);
        }
        else {
            yield (0, registerUser_1.registerUser)(req.body);
            const token = yield (0, loginUser_1.loginUser)(req.body.email, req.body.password);
            res.send(token);
        }
    }
    catch (err) {
        (0, handleError_1.catchError)(res, err);
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, loginUser_1.loginUser)(req.body.email, req.body.password);
        res.send(token);
    }
    catch (err) {
        (0, handleError_1.catchError)(res, err);
    }
}));
router.get("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { id } = req.params;
        if (!user || (user._id !== id && !user.isAdmin)) {
            (0, createError_1.default)("Authorization", "You do not have permission to access this profile", 403);
        }
        else {
            const user = yield (0, getUsers_1.default)(id);
            res.send(lodash_1.default.pick(user, ["name", "email", "_id"]));
        }
    }
    catch (err) {
        (0, handleError_1.catchError)(res, err);
    }
}));
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!(user === null || user === void 0 ? void 0 : user.isAdmin)) {
            (0, createError_1.default)("Authorization", "You do not have permission to access this information", 403);
        }
        else {
            const users = yield (0, getUsers_1.default)();
            res.send(users.map((user) => lodash_1.default.pick(user, ["_id", "name", "email"])));
        }
    }
    catch (err) {
        (0, handleError_1.catchError)(res, err);
    }
}));
router.put("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { id } = req.params;
        if (!user || (user._id !== id && !user.isAdmin)) {
            (0, createError_1.default)("Authorization", "You do not have permission to edit this profile", 403);
        }
        else {
            const schemaError = (0, requestValidators_1.validateEditUserBody)(req.body);
            if (schemaError) {
                (0, handleError_1.default)(res, 400, schemaError);
            }
            else {
                const updated = yield (0, editUser_1.default)(id, req.body);
                res.send(lodash_1.default.pick(updated, ["name", "email", "_id"]));
            }
        }
    }
    catch (err) {
        (0, handleError_1.catchError)(res, err);
    }
}));
router.delete("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { id } = req.params;
        if (!user || (user._id !== id && !user.isAdmin)) {
            (0, createError_1.default)("Authorization", "You do not have permission to delete this profile", 403);
        }
        else {
            const deleted = yield (0, deleteUser_1.default)(id);
            res.send(lodash_1.default.pick(deleted, ["name", "email", "_id"]));
        }
    }
    catch (err) {
        (0, handleError_1.catchError)(res, err);
    }
}));
