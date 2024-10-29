"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Modifier_1 = require("./Modifier");
const armorClassField = new mongoose_1.Schema({
    base: {
        type: [Modifier_1.numberModifier],
        validate: {
            validator: v => Array.isArray(v) && v.length > 0
        }
    },
    modifiers: {
        type: [Modifier_1.numberModifier],
        validate: {
            validator: v => Array.isArray(v),
        }
    },
});
// armorClassField.virtual("value").get(function (this: ArmorClass): number {
//     const base: number[] = this.base.map((modifier) => modifier.value);
//     const modifiers: number[] = this.base.map((modifier) => modifier.value);
//     return sum([...base, ...modifiers]);
// });
exports.default = armorClassField;
