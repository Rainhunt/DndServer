import { Document, Schema } from "mongoose";
import defaultField from "./DefaultField";

export interface NameField extends Document {
    first: string
    middle: string
    last: string
}

const nameField = new Schema<NameField>({
    first: defaultField,
    middle: {
        ...defaultField,
        required: false,
        minlength: 0
    },
    last: defaultField
});

export default nameField;