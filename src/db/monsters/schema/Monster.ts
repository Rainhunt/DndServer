import { Document, model, Schema } from "mongoose";
import { ICreature } from "../../schemas/creatureSchemas/creature";
import defaultField from "../../schemas/DefaultField";
import { ALIGNMENTS, CREATURE_SIZES, CREATURE_TYPES, matchEnum } from "../../../resources/srdEnums";
import armorClassField from "../../schemas/creatureSchemas/ArmorClassField";
import hitPointsField from "../../schemas/creatureSchemas/HitPointsField";
import speedField from "../../schemas/creatureSchemas/SpeedField";
import abilityScoresField from "../../schemas/creatureSchemas/AbilityScoresField";
import proficienciesField from "../../schemas/creatureSchemas/ProficienciesField";

export interface IMonster extends ICreature, Document {
    CR: number,
    XP: number
}

const monsterSchema = new Schema<IMonster>({
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
    // hitPoints: {
    //     type: hitPointsField,
    //     required: true
    // },
    // speed: {
    //     type: [speedField],
    //     validate: {
    //         validator: v => Array.isArray(v) && v.length > 0,
    //     }
    // },
    // abilityScores: {
    //     type: abilityScoresField,
    //     required: true
    // },
    // proficiencies: {
    //     type: proficienciesField,
    //     required: true
    // }
});

const Monster = model<IMonster>("Monster", monsterSchema);
export default Monster;