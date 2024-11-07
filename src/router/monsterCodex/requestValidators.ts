import config from "../../Config/config";
import newMonsterJoiSchema from "./requestSchemas/joi/newMonster";

const validatorType = config.SCHEMA_VALIDATOR;

export function validateNewMonsterBody(monster: object): string | undefined {
    switch (validatorType) {
        case "joi":
        default:
            return newMonsterJoiSchema.validate(monster).error?.details[0].message;
    }
}