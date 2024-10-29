"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DefaultField_1 = __importDefault(require("../../schemas/DefaultField"));
const srdEnums_1 = require("../../../resources/srdEnums");
const ArmorClassField_1 = __importDefault(require("../../schemas/creatureSchemas/ArmorClassField"));
const monsterSchema = new mongoose_1.Schema({
    name: Object.assign(Object.assign({}, DefaultField_1.default), { unique: true }),
    size: {
        type: String,
        required: true,
        match: (0, srdEnums_1.matchEnum)(srdEnums_1.CREATURE_SIZES)
    },
    type: {
        type: String,
        required: true,
        match: (0, srdEnums_1.matchEnum)(srdEnums_1.CREATURE_TYPES)
    },
    alignment: {
        type: String,
        required: true,
        match: (0, srdEnums_1.matchEnum)(srdEnums_1.ALIGNMENTS)
    },
    armorClass: {
        type: ArmorClassField_1.default,
        required: true
    },
    // hitPoints: {
    //     type: hitPointsField,
    //     required: true
    // },
    // speed: {
    //     type: [speedField],
    //     validate: {
    //         validator: v => Array.isArray(v) && v.length > 0,
    //     }
    // },
    // abilityScores: {
    //     type: abilityScoresField,
    //     required: true
    // },
    // proficiencies: {
    //     type: proficienciesField,
    //     required: true
    // }
});
const Monster = (0, mongoose_1.model)("Monster", monsterSchema);
exports.default = Monster;
