import { Schema } from "mongoose";
import { Modifier } from "./Modifier";
import { CONDITIONS, matchEnum } from "../../../resources/srdEnums";

const conditionImmunities = new Schema<Modifier<CONDITIONS>>({
    value: {
        type: String,
        required: true,
        match: matchEnum(CONDITIONS)
    },
    source: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256
    }
});

export default conditionImmunities;
