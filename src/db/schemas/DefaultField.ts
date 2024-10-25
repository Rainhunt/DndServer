import { SchemaTypeOptions } from "mongoose";

const defaultField: SchemaTypeOptions<string> = {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
    trim: true,
    lowercase: true
}

export default defaultField;