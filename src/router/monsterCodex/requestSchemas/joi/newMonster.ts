import Joi, { AlternativesSchema } from "joi";
import { ABILITY_SCORES, ALIGNMENTS, ARMOR_TYPES, CONDITIONS, CREATURE_SIZES, CREATURE_TYPES, DAMAGE_TYPES, LANGUAGES, SKILLS, SPEED_TYPES, TOOLS, WEAPON_TYPES } from "../../../../resources/srdEnums";

function numOrModifierArray(min = 1, max = 1000000): AlternativesSchema {
    return Joi.alternatives().try(
        Joi.number().integer().min(min).max(max),
        Joi.array().items(Joi.object({
            value: Joi.number().integer().min(min).max(max).required(),
            source: Joi.string().min(2).max(256).required()
        }))).required().messages({
            "alternatives.types": "{#label} must be a number or a modifier array"
        });
}

const newMonsterJoiSchema = Joi.object({
    CR: Joi.number().integer().min(0).max(40).required(),
    name: Joi.string().min(2).max(256).required(),
    size: Joi.string().valid(...Object.values(CREATURE_SIZES)).required(),
    type: Joi.string().valid(...Object.values(CREATURE_TYPES)).required(),
    alignment: Joi.string().valid(...Object.values(ALIGNMENTS)).required(),
    armorClass: numOrModifierArray(1, 40),
    hitPoints: numOrModifierArray(),
    speed: Joi.alternatives().try(
        Joi.number().integer().min(1).max(1000000),
        Joi.array().items(Joi.object({
            type: Joi.string().valid(...Object.values(SPEED_TYPES)).required(),
            base: numOrModifierArray()
        }))).required().messages({
            "alternatives.types": "{#label} must be a number or an array of speed objects"
        }),
    abilityScores: Joi.object({
        CHA: numOrModifierArray(1, 100),
        CON: numOrModifierArray(1, 100),
        DEX: numOrModifierArray(1, 100),
        INT: numOrModifierArray(1, 100),
        STR: numOrModifierArray(1, 100),
        WIS: numOrModifierArray(1, 100)
    }).required(),
    proficiencies: Joi.object({
        skills: Joi.array().items(Joi.string().valid(...Object.values(SKILLS))).optional(),
        tools: Joi.array().items(Joi.string().valid(...Object.values(TOOLS))).optional(),
        savingThrows: Joi.array().items(Joi.string().valid(...Object.values(ABILITY_SCORES))).optional(),
        weapons: Joi.array().items(Joi.string().valid(...Object.values(WEAPON_TYPES))).optional(),
        armor: Joi.array().items(Joi.string().valid(...Object.values(ARMOR_TYPES))).optional(),
        languages: Joi.array().items(Joi.string().valid(...Object.values(LANGUAGES))).optional()
    }).optional(),
    damageTypes: Joi.object({
        resistances: Joi.array().items(Joi.string().valid(...Object.values(DAMAGE_TYPES))).optional(),
        vulnerabilities: Joi.array().items(Joi.string().valid(...Object.values(DAMAGE_TYPES))).optional(),
        immunities: Joi.array().items(Joi.string().valid(...Object.values(DAMAGE_TYPES))).optional()
    }).optional(),
    conditionImmunities: Joi.array().items(Joi.string().valid(...Object.values(CONDITIONS))).optional()
}).messages({
    "any.required": "{#label} is required",
    "string.base": "{#label} must be a string",
    "string.min": "{#label} must be at least {#limit} characters long",
    "string.max": "{#label} must be less than {#limit} characters long",
    "number.base": "{#label} must be a number",
    "number.integer": "{#label} must be an integer",
    "number.min": "{#label} must be at least {#limit}",
    "number.max": "{#label} must be less than or equal to {#limit}",
    "any.only": "{#label} must be one of the following values: {#valids}"
});

export default newMonsterJoiSchema;