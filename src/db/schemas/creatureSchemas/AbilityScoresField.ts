import { Document, Schema } from "mongoose";
import { Modifier, numberModifier } from "./Modifier";
import { sum } from "lodash";

export interface AbiltiyScore extends Document {
    value: number;
    base: Modifier<number>[];
    modifiers: Modifier<number>[];
}

const abilityScore = new Schema<AbiltiyScore>({
    base: {
        type: [numberModifier],
        validate: {
            validator: v => Array.isArray(v) && v.length > 0,
        }
    },
    modifiers: {
        type: [numberModifier],
        validate: {
            validator: v => Array.isArray(v)
        }
    },
});

abilityScore.virtual("value").get(function (this: AbiltiyScore): number {
    const base: number[] = this.base.map((modifier) => modifier.value);
    const modifiers: number[] = this.base.map((modifier) => modifier.value);
    return sum([...base, ...modifiers]);
});

export interface AbilityScores {
    CHA: AbiltiyScore
    CON: AbiltiyScore
    DEX: AbiltiyScore
    INT: AbiltiyScore
    STR: AbiltiyScore
    WIS: AbiltiyScore
}

const abilityScoresField = new Schema<AbilityScores>({
    CHA: {
        type: abilityScore,
        required: true,
    },
    CON: {
        type: abilityScore,
        required: true
    },
    DEX: {
        type: abilityScore,
        required: true
    },
    INT: {
        type: abilityScore,
        required: true
    },
    STR: {
        type: abilityScore,
        required: true
    },
    WIS: {
        type: abilityScore,
        required: true
    },
});

export default abilityScoresField;