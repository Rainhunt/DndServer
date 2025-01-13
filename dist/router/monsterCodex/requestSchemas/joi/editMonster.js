"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const srdEnums_1 = require("../../../../resources/srdEnums");
function numOrModifierArray(min = 1, max = 1000000) {
    return joi_1.default.alternatives().try(joi_1.default.number().integer().min(min).max(max), joi_1.default.array().items(joi_1.default.object({
        value: joi_1.default.number().integer().min(min).max(max).required(),
        source: joi_1.default.string().min(2).max(256).required()
    }))).required().messages({
        "alternatives.types": "{#label} must be a number or a modifier array"
    });
}
function enumArrayOrModifierArray(enumType) {
    return joi_1.default.array().items(joi_1.default.alternatives().try(joi_1.default.string().valid(...Object.values(enumType)).required(), joi_1.default.object({
        value: joi_1.default.string().valid(...Object.values(enumType)).required(),
        source: joi_1.default.string().min(2).max(256).required()
    }))).required().messages({
        "alternatives.types": "{#label} must be an string or a modifier"
    });
}
const editMonsterJoiSchema = joi_1.default.object({
    CR: joi_1.default.alternatives().try(joi_1.default.number().integer().min(1).max(40).required(), joi_1.default.number().valid(0.125, 0.25, 0.5)),
    size: joi_1.default.string().valid(...Object.values(srdEnums_1.CREATURE_SIZES)).required(),
    type: joi_1.default.string().valid(...Object.values(srdEnums_1.CREATURE_TYPES)).required(),
    alignment: joi_1.default.string().valid(...Object.values(srdEnums_1.ALIGNMENTS)).required(),
    armorClass: numOrModifierArray(1, 40),
    hitPoints: numOrModifierArray(),
    speed: joi_1.default.alternatives().try(joi_1.default.number().integer().min(1).max(1000000), joi_1.default.array().items(joi_1.default.object({
        type: joi_1.default.string().valid(...Object.values(srdEnums_1.SPEED_TYPES)).required(),
        base: numOrModifierArray()
    }))).required().messages({
        "alternatives.types": "{#label} must be a number or an array of speed objects"
    }),
    abilityScores: joi_1.default.object({
        CHA: numOrModifierArray(1, 100),
        CON: numOrModifierArray(1, 100),
        DEX: numOrModifierArray(1, 100),
        INT: numOrModifierArray(1, 100),
        STR: numOrModifierArray(1, 100),
        WIS: numOrModifierArray(1, 100)
    }).required(),
    proficiencies: joi_1.default.object({
        skills: enumArrayOrModifierArray(srdEnums_1.SKILLS).optional(),
        tools: enumArrayOrModifierArray(srdEnums_1.TOOLS).optional(),
        savingThrows: enumArrayOrModifierArray(srdEnums_1.ABILITY_SCORES).optional(),
        weapons: enumArrayOrModifierArray(srdEnums_1.WEAPON_TYPES).optional(),
        armor: enumArrayOrModifierArray(srdEnums_1.ARMOR_TYPES).optional(),
        languages: enumArrayOrModifierArray(srdEnums_1.LANGUAGES).optional()
    }).optional(),
    damageTypes: joi_1.default.object({
        resistances: enumArrayOrModifierArray(srdEnums_1.DAMAGE_TYPES).optional(),
        vulnerabilities: enumArrayOrModifierArray(srdEnums_1.DAMAGE_TYPES).optional(),
        immunities: enumArrayOrModifierArray(srdEnums_1.DAMAGE_TYPES).optional()
    }).optional(),
    conditionImmunities: enumArrayOrModifierArray(srdEnums_1.CONDITIONS).optional()
}).messages({
    "any.required": "{#label} is required",
    "string.base": "{#label} must be a string",
    "string.min": "{#label} must be at least {#limit} characters long",
    "string.max": "{#label} must be less than {#limit} characters long",
    "number.base": "{#label} must be a number",
    "number.integer": "{#label} must be an integer",
    "number.min": "{#label} must be at least {#limit}",
    "number.max": "{#label} must be less than or equal to {#limit}",
    "array.base": "{#label} must be an array",
    "any.only": "{#label} must be one of the following values: {#valids}"
});
exports.default = editMonsterJoiSchema;
