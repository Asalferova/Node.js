const Joi = require('joi');

const userScheme = Joi.object({
    name: Joi.string().min(1).required(),
    secondName: Joi.string().min(1).required(),
    age: Joi.number().min(0).max(150).required(),
    city: Joi.string().min(1),
});

const idScheme = Joi.object({
    id: Joi.number().required()
});

module.exports = { userScheme, idScheme };