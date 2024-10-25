import Joi from "joi";

const signupJoiSchema = Joi.object({
    name: Joi.object().keys({
        first: Joi.string().min(2).max(256).required(),
        middle: Joi.string().min(2).max(256),
        last: Joi.string().min(2).max(256).required(),
    }).required(),
    email: Joi.string().ruleset.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .rule({ message: "You must provide a valid email" }).required(),
    password: Joi.string().ruleset.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/)
        .rule({ message: "Your password must be 8-20 characters long, contain an uppercase and lowercase letter, a number, and a symbol (!@#$%^&*-)" })
        .required()
});

export default signupJoiSchema;