import { Document, Schema } from "mongoose";
import defaultField from "../DefaultField";

export interface Modifier<T> extends Document {
    value: T,
    source: string
}

export const stringModifier = new Schema<Modifier<string>>({
    value: defaultField,
    source: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256
    }
});

export const numberModifier = new Schema<Modifier<number>>({
    value: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    source: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256
    }
});