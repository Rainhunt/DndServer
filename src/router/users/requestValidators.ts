import config from "../../Config/config";
import signupJoiSchema from "./requestSchemas/joi/signup";

const validatorType = config.SCHEMA_VALIDATOR;

export function validateRegistrationBody(user: object): string | undefined {
    switch (validatorType) {
        case "joi":
        default:
            return signupJoiSchema.validate(user).error?.details[0].message;
    }
}