"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DefaultField_1 = __importDefault(require("../../schemas/DefaultField"));
const srdEnums_1 = require("../../../resources/srdEnums");
const ArmorClassField_1 = __importDefault(require("../../schemas/creatureSchemas/ArmorClassField"));
const HitPointsField_1 = __importDefault(require("../../schemas/creatureSchemas/HitPointsField"));
const SpeedField_1 = __importDefault(require("../../schemas/creatureSchemas/SpeedField"));
const AbilityScoresField_1 = __importDefault(require("../../schemas/creatureSchemas/AbilityScoresField"));
const ProficienciesField_1 = __importDefault(require("../../schemas/creatureSchemas/ProficienciesField"));
const conditionImmunities_1 = __importDefault(require("../../schemas/creatureSchemas/conditionImmunities"));
const damageTypesField_1 = __importDefault(require("../../schemas/creatureSchemas/damageTypesField"));
const monsterSchema = new mongoose_1.Schema({
    CR: {
        type: Number,
        required: true,
        min: 0,
        max: 40
    },
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
    hitPoints: {
        type: HitPointsField_1.default,
        required: true
    },
    speed: {
        type: [SpeedField_1.default],
        validate: {
            validator: v => Array.isArray(v) && v.filter(Boolean).length > 0
        }
    },
    abilityScores: {
        type: AbilityScoresField_1.default,
        required: true
    },
    proficiencies: {
        type: ProficienciesField_1.default,
        required: true
    },
    abilities: {
        type: [String],
        validate: {
            validator: v => Array.isArray(v)
        }
    },
    conditionImmunities: {
        type: [conditionImmunities_1.default],
        validate: {
            validator: v => Array.isArray(v)
        }
    },
    damageTypes: {
        type: damageTypesField_1.default,
        required: true
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
const Monster = (0, mongoose_1.model)("Monster", monsterSchema);
exports.default = Monster;
