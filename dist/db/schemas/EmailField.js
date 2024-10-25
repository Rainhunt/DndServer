"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailField = {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    trim: true,
    lowercase: true,
    unique: true
};
exports.default = emailField;
