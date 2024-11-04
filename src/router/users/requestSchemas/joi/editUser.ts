import Joi from "joi";

const editUserJoiSchema = Joi.object({
    name: Joi.object().keys({
        first: Joi.string().min(2).max(256).required(),
        middle: Joi.string().min(2).max(256),
        last: Joi.string().min(2).max(256).required(),
    }).required()
});

export default editUserJoiSchema;