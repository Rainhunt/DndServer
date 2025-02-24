import config from "../../Config/config";
import editUserJoiSchema from "./requestSchemas/joi/editUser";
import loginJoiSchema from "./requestSchemas/joi/login";
import signupJoiSchema from "./requestSchemas/joi/signup";

const validatorType = config.SCHEMA_VALIDATOR;

export function validateRegistrationBody(user: object): string | undefined {
    switch (validatorType) {
        case "joi":
        default:
            return signupJoiSchema.validate(user).error?.details[0].message;
    }
}

export function validateLoginBody(user: object): string | undefined {
    switch (validatorType) {
        case "joi":
        default:
            return loginJoiSchema.validate(user).error?.details[0].message;
    }
}

export function validateEditUserBody(user: object): string | undefined {
    switch (validatorType) {
        case "joi":
        default:
            return editUserJoiSchema.validate(user).error?.details[0].message;
    }
}