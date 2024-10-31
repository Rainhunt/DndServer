"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditionImmunities = void 0;
const mongoose_1 = require("mongoose");
const srdEnums_1 = require("../../../resources/srdEnums");
exports.conditionImmunities = new mongoose_1.Schema({
    value: {
        type: String,
        required: true,
        match: (0, srdEnums_1.matchEnum)(srdEnums_1.CONDITIONS)
    },
    source: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256
    }
});
