import { SchemaTypeOptions } from "mongoose";

const passwordField: SchemaTypeOptions<string> = {
    type: String,
    required: true,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
}

export default passwordField;