"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Modifier_1 = require("./Modifier");
const lodash_1 = require("lodash");
const hitPointsField = new mongoose_1.Schema({
    sources: {
        type: [Modifier_1.numberModifier],
        validate: {
            validator: v => Array.isArray(v) && v.length > 0,
        }
    },
    current: {
        type: Number,
        min: 0,
        required: true
    },
    temp: {
        type: Number,
        min: 0,
        required: true
    }
});
hitPointsField.virtual("max").get(function () {
    return (0, lodash_1.sum)([...this.sources.map((modifier) => modifier.value)]);
});
exports.default = hitPointsField;
