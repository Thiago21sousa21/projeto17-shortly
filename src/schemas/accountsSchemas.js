import Joi from "joi";

export const signupSchema = Joi.object(
    {
        name: Joi.string().trim().required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().required(),
        confirmPassword: Joi.string().trim().required().valid(Joi.ref('password'))
    }
)