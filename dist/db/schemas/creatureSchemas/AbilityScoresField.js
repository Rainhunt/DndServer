"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Modifier_1 = require("./Modifier");
const lodash_1 = require("lodash");
const abilityScore = new mongoose_1.Schema({
    base: {
        type: [Modifier_1.numberModifier],
        validate: {
            validator: v => Array.isArray(v) && v.filter(Boolean).length > 0
        }
    },
    modifiers: {
        type: [Modifier_1.numberModifier],
        validate: {
            validator: v => Array.isArray(v)
        }
    },
});
abilityScore.virtual("value").get(function () {
    const base = this.base.map((modifier) => modifier.value);
    const modifiers = this.base.map((modifier) => modifier.value);
    return (0, lodash_1.sum)([...base, ...modifiers]);
});
const abilityScoresField = new mongoose_1.Schema({
    CHA: {
        type: abilityScore,
        required: true,
    },
    CON: {
        type: abilityScore,
        required: true
    },
    DEX: {
        type: abilityScore,
        required: true
    },
    INT: {
        type: abilityScore,
        required: true
    },
    STR: {
        type: abilityScore,
        required: true
    },
    WIS: {
        type: abilityScore,
        required: true
    },
});
exports.default = abilityScoresField;
