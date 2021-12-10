const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schemaValidation = Joi.object({
        name: Joi.string().min(4).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
        });
        return schemaValidation.validate(data)
};

const loginValidation = (data) => {
    const schemaValidation = Joi.object({
        email: Joi.string().min(4).max(255).required(),
        password: Joi.string().min(6).max(255).required(),
        });
        return schemaValidation.validate(data)
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
