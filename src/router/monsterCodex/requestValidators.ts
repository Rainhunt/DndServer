import config from "../../Config/config";
import newMonsterJoiSchema from "./requestSchemas/joi/newMonster";

const validatorType = config.SCHEMA_VALIDATOR;

export function validateNewMonsterBody(user: object): string | undefined {
    switch (validatorType) {
        case "joi":
        default:
            return newMonsterJoiSchema.validate(user).error?.details[0].message;
    }
}