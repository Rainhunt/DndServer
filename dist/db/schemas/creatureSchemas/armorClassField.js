"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Modifier_1 = require("./Modifier");
const lodash_1 = require("lodash");
const armorClassField = new mongoose_1.Schema({
    base: {
        type: [Modifier_1.numberModifier],
        validate: {
            validator: v => Array.isArray(v) && v.filter(Boolean).length > 0
        }
    },
    modifiers: {
        type: [Modifier_1.numberModifier],
        validate: {
            validator: Array.isArray,
        }
    }
});
armorClassField.virtual("value").get(function () {
    const base = this.base.map((modifier) => modifier.value);
    const modifiers = this.modifiers.map((modifier) => modifier.value);
    return (0, lodash_1.sum)([...base, ...modifiers]);
});
exports.default = armorClassField;
