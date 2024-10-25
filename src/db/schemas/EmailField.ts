import { SchemaTypeOptions } from "mongoose";

const emailField: SchemaTypeOptions<string> = {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    trim: true,
    lowercase: true,
    unique: true
}

export default emailField;