"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const srdEnums_1 = require("../../../../resources/srdEnums");
function numberModifierArray(min = 1, max = 1000000) {
    return joi_1.default.array().items(joi_1.default.object({
        value: joi_1.default.number().integer().min(min).max(max).required(),
        source: joi_1.default.string().min(2).max(256).required()
    }));
}
function enumModifierArray(enumType) {
    return joi_1.default.array().items(joi_1.default.object({
        value: joi_1.default.string().valid(...Object.values(enumType)).required(),
        source: joi_1.default.string().min(2).max(256).required()
    }));
}
const editMonsterJoiSchema = joi_1.default.object({
    CR: joi_1.default.number().integer().min(0).max(40).required(),
    name: joi_1.default.string().min(2).max(256).required(),
    size: joi_1.default.string().valid(...Object.values(srdEnums_1.CREATURE_SIZES)).required(),
    type: joi_1.default.string().valid(...Object.values(srdEnums_1.CREATURE_TYPES)).required(),
    alignment: joi_1.default.string().valid(...Object.values(srdEnums_1.ALIGNMENTS)).required(),
    armorClass: joi_1.default.object({
        base: numberModifierArray(1, 40).required(),
        modifiers: numberModifierArray(1, 40).required()
    }).required(),
    hitPoints: joi_1.default.object({
        sources: numberModifierArray().required()
    }).required(),
    speed: joi_1.default.array().items(joi_1.default.object({
        type: joi_1.default.string().valid(...Object.values(srdEnums_1.SPEED_TYPES)).required(),
        base: numberModifierArray().required()
    })).required(),
    abilityScores: joi_1.default.object({
        CHA: joi_1.default.object({
            base: numberModifierArray(1, 100).required()
        }).required(),
        CON: joi_1.default.object({
            base: numberModifierArray(1, 100).required()
        }).required(),
        DEX: joi_1.default.object({
            base: numberModifierArray(1, 100).required()
        }).required(),
        INT: joi_1.default.object({
            base: numberModifierArray(1, 100).required()
        }).required(),
        STR: joi_1.default.object({
            base: numberModifierArray(1, 100).required()
        }).required(),
        WIS: joi_1.default.object({
            base: numberModifierArray(1, 100).required()
        }).required()
    }).required(),
    proficiencies: joi_1.default.object({
        skills: enumModifierArray(srdEnums_1.SKILLS).required(),
        tools: enumModifierArray(srdEnums_1.TOOLS).required(),
        savingThrows: enumModifierArray(srdEnums_1.ABILITY_SCORES).required(),
        weapons: enumModifierArray(srdEnums_1.WEAPON_TYPES).required(),
        armor: enumModifierArray(srdEnums_1.ARMOR_TYPES).required(),
        languages: enumModifierArray(srdEnums_1.LANGUAGES).required()
    }).required(),
    damageTypes: joi_1.default.object({
        resistances: enumModifierArray(srdEnums_1.DAMAGE_TYPES).required(),
        vulnerabilities: enumModifierArray(srdEnums_1.DAMAGE_TYPES).required(),
        immunities: enumModifierArray(srdEnums_1.DAMAGE_TYPES).required()
    }).optional(),
    conditionImmunities: enumModifierArray(srdEnums_1.CONDITIONS).required()
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
