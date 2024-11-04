import { Document, Schema } from "mongoose";
import { matchEnum, SPEED_TYPES } from "../../../resources/srdEnums";
import { Modifier, numberModifier } from "./Modifier";
import { sum } from "lodash";

export interface Speed extends Document {
    type: SPEED_TYPES
    value: number;
    base: Modifier<number>[];
    modifiers: Modifier<number>[];
}

const speedField = new Schema<Speed>({
    type: {
        type: String,
        match: matchEnum(SPEED_TYPES)
    },
    base: {
        type: [numberModifier],
        validate: {
            validator: v => Array.isArray(v) && v.filter(Boolean).length > 0
        }
    },
    modifiers: {
        type: [numberModifier],
        validate: {
            validator: v => Array.isArray(v),
        }
    },
});

speedField.virtual("value").get(function (this: Speed): number {
    const base: number[] = this.base.map((modifier) => modifier.value);
    const modifiers: number[] = this.modifiers.map((modifier) => modifier.value);
    return sum([...base, ...modifiers]);
});

export default speedField;