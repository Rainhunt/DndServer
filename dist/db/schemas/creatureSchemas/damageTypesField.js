"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.damageTypesField = exports.damageType = void 0;
const mongoose_1 = require("mongoose");
const srdEnums_1 = require("../../../resources/srdEnums");
exports.damageType = new mongoose_1.Schema({
    value: {
        type: String,
        required: true,
        match: (0, srdEnums_1.matchEnum)(srdEnums_1.DAMAGE_TYPES)
    },
    source: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256
    }
});
exports.damageTypesField = new mongoose_1.Schema({
    resistances: {
        type: [exports.damageType],
        required: true,
    },
    vulnerabilities: {
        type: [exports.damageType],
        required: true,
    },
    immunities: {
        type: [exports.damageType],
        required: true,
    }
});
