"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Modifier_1 = require("./Modifier");
const srdEnums_1 = require("../../../resources/srdEnums");
const proficienciesField = new mongoose_1.Schema({
    proficiencyBonus: {
        type: Number,
        min: 0,
        max: 15
    },
    skills: {
        type: [Modifier_1.stringModifier],
        validate: {
            validator: (v) => v.every(modifier => Object.values(srdEnums_1.SKILLS).includes(modifier.value))
        }
    },
    tools: {
        type: [Modifier_1.stringModifier],
        validate: {
            validator: (v) => v.every(modifier => Object.values(srdEnums_1.TOOLS).includes(modifier.value))
        }
    },
    savingThrows: {
        type: [Modifier_1.stringModifier],
        validate: {
            validator: (v) => v.every(modifier => Object.values(srdEnums_1.ABILITY_SCORES).includes(modifier.value))
        }
    },
    weapons: {
        type: [Modifier_1.stringModifier],
        validate: {
            validator: (v) => v.every(modifier => Object.values(srdEnums_1.WEAPON_TYPES).includes(modifier.value))
        }
    },
    armor: {
        type: [Modifier_1.stringModifier],
        validate: {
            validator: (v) => v.every(modifier => Object.values(srdEnums_1.ARMOR_TYPES).includes(modifier.value))
        }
    },
    languages: {
        type: [Modifier_1.stringModifier],
        validate: {
            validator: (v) => v.every(modifier => Object.values(srdEnums_1.LANGUAGES).includes(modifier.value))
        }
    },
});
exports.default = proficienciesField;
