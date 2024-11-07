import config from "../../Config/config";
import editMonsterJoiSchema from "./requestSchemas/joi/editMonster";
import newMonsterJoiSchema from "./requestSchemas/joi/newMonster";

const validatorType = config.SCHEMA_VALIDATOR;

export function validateNewMonsterBody(monster: object): string | undefined {
    switch (validatorType) {
        case "joi":
        default:
            return newMonsterJoiSchema.validate(monster).error?.details[0].message;
    }
}

export function validateEditMonsterBody(monster: object): string | undefined {
    switch (validatorType) {
        case "joi":
        default:
            return editMonsterJoiSchema.validate(monster).error?.details[0].message;
    }
}