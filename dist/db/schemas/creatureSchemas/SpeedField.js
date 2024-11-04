"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const srdEnums_1 = require("../../../resources/srdEnums");
const Modifier_1 = require("./Modifier");
const lodash_1 = require("lodash");
const speedField = new mongoose_1.Schema({
    type: {
        type: String,
        match: (0, srdEnums_1.matchEnum)(srdEnums_1.SPEED_TYPES)
    },
    base: {
        type: [Modifier_1.numberModifier],
        validate: {
            validator: v => Array.isArray(v) && v.filter(Boolean).length > 0
        }
    },
    modifiers: {
        type: [Modifier_1.numberModifier],
        validate: {
            validator: v => Array.isArray(v),
        }
    },
});
speedField.virtual("value").get(function () {
    const base = this.base.map((modifier) => modifier.value);
    const modifiers = this.modifiers.map((modifier) => modifier.value);
    return (0, lodash_1.sum)([...base, ...modifiers]);
});
exports.default = speedField;
