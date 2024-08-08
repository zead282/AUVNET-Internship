import Joi from "joi";

export const signupschema={

    body:Joi.object({
        username: Joi.string().min(3).max(10).alphanum().required().messages({
            'any.required': 'please enter your username'
        }),
        email:Joi.string().required().email({tlds:{allow:['com','org','yahoo']}}),
      
        password:Joi.string().required(),
        cpass:Joi.string().valid(Joi.ref('password')).required(),
        role:Joi.string(),
    })
}