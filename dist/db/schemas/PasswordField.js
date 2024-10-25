"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passwordField = {
    type: String,
    required: true,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
};
exports.default = passwordField;
