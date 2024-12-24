import { Document, model, Schema, Types } from "mongoose";
import { ICreature } from "../../schemas/creatureSchemas/creature";
import defaultField from "../../schemas/DefaultField";
import { ALIGNMENTS, BIOMES, CREATURE_SIZES, CREATURE_TYPES, matchEnum } from "../../../resources/srdEnums";
import armorClassField from "../../schemas/creatureSchemas/ArmorClassField";
import hitPointsField from "../../schemas/creatureSchemas/HitPointsField";
import speedField from "../../schemas/creatureSchemas/SpeedField";
import abilityScoresField from "../../schemas/creatureSchemas/AbilityScoresField";
import proficienciesField from "../../schemas/creatureSchemas/ProficienciesField";
import conditionImmunities from "../../schemas/creatureSchemas/conditionImmunities";
import damageTypesField from "../../schemas/creatureSchemas/damageTypesField";

export interface IMonster extends ICreature, Document {
    CR: number
    biome: BIOMES
    createdBy: Schema.Types.ObjectId
}

const monsterSchema = new Schema<IMonster>({
    biome: {
        type: String,
        required: true,
        match: matchEnum(BIOMES)
    },
    CR: {
        type: Number,
        required: true,
        min: 0,
        max: 40
    },
    name: {
        ...defaultField,
        unique: true
    },
    size: {
        type: String,
        required: true,
        match: matchEnum(CREATURE_SIZES)
    },
    type: {
        type: String,
        required: true,
        match: matchEnum(CREATURE_TYPES)
    },
    alignment: {
        type: String,
        required: true,
        match: matchEnum(ALIGNMENTS)
    },
    armorClass: {
        type: armorClassField,
        required: true
    },
    hitPoints: {
        type: hitPointsField,
        required: true
    },
    speed: {
        type: [speedField],
        validate: {
            validator: v => Array.isArray(v) && v.filter(Boolean).length > 0
        }
    },
    abilityScores: {
        type: abilityScoresField,
        required: true
    },
    proficiencies: {
        type: proficienciesField,
        required: true
    },
    abilities: {
        type: [String],
        validate: {
            validator: v => Array.isArray(v)
        }
    },
    conditionImmunities: {
        type: [conditionImmunities],
        validate: {
            validator: v => Array.isArray(v)
        }
    },
    damageTypes: {
        type: damageTypesField,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Monster = model<IMonster>("Monster", monsterSchema);
export default Monster;