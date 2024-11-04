import { Document, Schema } from "mongoose";
import { Modifier, numberModifier } from "./Modifier";
import { sum } from "lodash";

export interface ArmorClass extends Document {
    value: number;
    base: Modifier<number>[];
    modifiers: Modifier<number>[];
}

const armorClassField = new Schema<ArmorClass>({
    base: {
        type: [numberModifier],
        validate: {
            validator: v => Array.isArray(v) && v.filter(Boolean).length > 0
        }
    },
    modifiers: {
        type: [numberModifier],
        validate: {
            validator: Array.isArray,
        }
    }
});

armorClassField.virtual("value").get(function (this: ArmorClass): number {
    const base: number[] = this.base.map((modifier) => modifier.value);
    const modifiers: number[] = this.modifiers.map((modifier) => modifier.value);
    return sum([...base, ...modifiers]);
});

export default armorClassField;