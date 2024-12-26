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
exports.monsterCodexRouter = void 0;
const express_1 = require("express");
const handleError_1 = __importStar(require("../../errors/handleError"));
const auth_1 = __importDefault(require("../../services/auth"));
const addMonster_1 = require("../../db/monsters/services/addMonster");
const requestValidators_1 = require("./requestValidators");
const mapNewMonster_1 = require("./requestSchemas/joi/mapNewMonster");
const getMonsters_1 = __importDefault(require("../../db/monsters/services/getMonsters"));
const getMyMonsters_1 = __importDefault(require("../../db/monsters/services/getMyMonsters"));
const createError_1 = __importDefault(require("../../errors/createError"));
const deleteMonster_1 = __importDefault(require("../../db/monsters/services/deleteMonster"));
const editMonster_1 = __importDefault(require("../../db/monsters/services/editMonster"));
const mapEditMonster_1 = require("./requestSchemas/joi/mapEditMonster");
const lodash_1 = __importDefault(require("lodash"));
const router = (0, express_1.Router)();
exports.monsterCodexRouter = router;
router.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            (0, handleError_1.default)(res, 403, "You must be logged in to create a new monster");
        }
        else {
            const schemaError = (0, requestValidators_1.validateNewMonsterBody)(req.body);
            if (schemaError) {
                (0, handleError_1.default)(res, 400, schemaError);
            }
            else {
                let monster = (0, mapNewMonster_1.mapNewMonster)(req.body, user);
                monster = yield (0, addMonster_1.addMonster)(monster);
                res.send(monster);
            }
        }
    }
    catch (err) {
        (0, handleError_1.catchError)(res, err);
    }
}));
router.get("/my-creations", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            (0, handleError_1.default)(res, 403, "You must be logged in to get your monsters");
        }
        else {
            const monsters = yield (0, getMyMonsters_1.default)(user._id);
            res.send(monsters);
        }
    }
    catch (err) {
        (0, handleError_1.catchError)(res, err);
    }
}));
router.get("/full-statblock", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const monsters = yield (0, getMonsters_1.default)();
        res.send(monsters);
    }
    catch (err) {
        (0, handleError_1.catchError)(res, err);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const monster = yield (0, getMonsters_1.default)(id);
        res.send(monster);
    }
    catch (err) {
        (0, handleError_1.catchError)(res, err);
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const monsters = yield (0, getMonsters_1.default)();
        res.send(monsters.map(monster => lodash_1.default.pick(monster, ["_id", "biome", "CR", "name", "size", "type", "alignment", "hitPoints.current"])));
    }
    catch (err) {
        (0, handleError_1.catchError)(res, err);
    }
}));
router.put("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { id } = req.params;
        const monster = yield (0, getMonsters_1.default)(id);
        if (!user) {
            (0, handleError_1.default)(res, 403, "You must be logged in to edit your monsters");
        }
        else if (monster.createdBy.toString() !== user._id && !user.isAdmin) {
            (0, createError_1.default)("Authorization", "You do not have permission to edit this monster", 403);
        }
        else {
            const schemaError = (0, requestValidators_1.validateEditMonsterBody)(req.body);
            if (schemaError) {
                (0, handleError_1.default)(res, 400, schemaError);
            }
            else {
                let editedMonster = (0, mapEditMonster_1.mapEditMonster)(req.body);
                editedMonster = yield (0, editMonster_1.default)(id, editedMonster);
                res.send(editedMonster);
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
        const monster = yield (0, getMonsters_1.default)(id);
        if (!user || (user._id !== monster.createdBy.toString() && !user.isAdmin)) {
            (0, createError_1.default)("Authorization", "You do not have permission to delete this monster", 403);
        }
        else {
            const deleted = yield (0, deleteMonster_1.default)(id);
            res.send(deleted);
        }
    }
    catch (err) {
        (0, handleError_1.catchError)(res, err);
    }
}));
