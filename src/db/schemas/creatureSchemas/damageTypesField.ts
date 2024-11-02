import { Schema } from "mongoose";
import { Modifier } from "./Modifier";
import { DAMAGE_TYPES, matchEnum } from "../../../resources/srdEnums";

export const damageType = new Schema<Modifier<DAMAGE_TYPES>>({
    value: {
        type: String,
        required: true,
        match: matchEnum(DAMAGE_TYPES)
    },
    source: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256
    }
});

export interface DamageTypes {
    resistances: Modifier<DAMAGE_TYPES>[];
    vulnerabilities: Modifier<DAMAGE_TYPES>[];
    immunities: Modifier<DAMAGE_TYPES>[];
}

const damageTypesField = new Schema<DamageTypes>({
    resistances: {
        type: [damageType],
        required: true,
    },
    vulnerabilities: {
        type: [damageType],
        required: true,
    },
    immunities: {
        type: [damageType],
        required: true,
    }
});

export default damageTypesField;