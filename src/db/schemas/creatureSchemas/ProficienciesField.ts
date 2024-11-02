import { Document, Schema } from "mongoose";
import { Modifier, stringModifier } from "./Modifier";
import { ABILITY_SCORES, ARMOR_TYPES, LANGUAGES, SKILLS, TOOLS, WEAPON_TYPES } from "../../../resources/srdEnums";

export interface Proficiencies extends Document {
    proficiencyBonus: number;
    skills: Modifier<SKILLS>[];
    tools: Modifier<TOOLS>[];
    savingThrows: Modifier<ABILITY_SCORES>[];
    weapons: Modifier<WEAPON_TYPES>[];
    armor: Modifier<ARMOR_TYPES>[];
    languages: Modifier<LANGUAGES>[];
}

const proficienciesField = new Schema<Proficiencies>({
    proficiencyBonus: {
        type: Number,
        min: 0,
        max: 15
    },
    skills: {
        type: [stringModifier],
        validate: {
            validator: (v: Modifier<SKILLS>[]) => v.every(modifier => Object.values(SKILLS).includes(modifier.value))
        }
    },
    tools: {
        type: [stringModifier],
        validate: {
            validator: (v: Modifier<TOOLS>[]) => v.every(modifier => Object.values(TOOLS).includes(modifier.value))
        }
    },
    savingThrows: {
        type: [stringModifier],
        validate: {
            validator: (v: Modifier<ABILITY_SCORES>[]) => v.every(modifier => Object.values(ABILITY_SCORES).includes(modifier.value))
        }
    },
    weapons: {
        type: [stringModifier],
        validate: {
            validator: (v: Modifier<WEAPON_TYPES>[]) => v.every(modifier => Object.values(WEAPON_TYPES).includes(modifier.value))
        }
    },
    armor: {
        type: [stringModifier],
        validate: {
            validator: (v: Modifier<ARMOR_TYPES>[]) => v.every(modifier => Object.values(ARMOR_TYPES).includes(modifier.value))
        }
    },
    languages: {
        type: [stringModifier],
        validate: {
            validator: (v: Modifier<LANGUAGES>[]) => v.every(modifier => Object.values(LANGUAGES).includes(modifier.value))
        }
    },
});

export default proficienciesField;