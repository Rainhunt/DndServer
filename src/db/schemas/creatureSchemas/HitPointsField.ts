import { Document, Schema } from "mongoose";
import { Modifier, numberModifier } from "./Modifier";
import { sum } from "lodash";

export interface HitPoints extends Document {
    max: number;
    current: number;
    temp: number;
    sources: Modifier<number>[];
}

const hitPointsField = new Schema<HitPoints>({
    sources: {
        type: [numberModifier],
        validate: {
            validator: v => Array.isArray(v) && v.length > 0,
        }
    },
    current: {
        type: Number,
        min: 0,
        required: true
    },
    temp: {
        type: Number,
        min: 0,
        required: true
    }
});

hitPointsField.virtual("max").get(function (this: HitPoints): number {
    return sum([...this.sources.map((modifier) => modifier.value)]);
});

export default hitPointsField;