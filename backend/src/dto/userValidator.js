const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'Name should be a string',
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name should have a minimum length of 3',
            'string.max': 'Name should have a maximum length of 30',
            'any.required': 'Name is a required field'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email should be a string',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is a required field'
        }),
    age: Joi.number()
        .integer()
        .min(0)
        .messages({
            'number.base': 'Age should be a number',
            'number.integer': 'Age must be an integer',
            'number.min': 'Age cannot be negative'
        }),
    gender: Joi.string()
        .valid('Male', 'Female', 'Other')
        .messages({
            'string.base': 'Gender should be a string',
            'any.only': 'Gender must be one of Male, Female, or Other'
        })
}).options({allowUnknown:true});


const validateUser = (user) => {
    return userSchema.validate(user);
};

module.exports = {
    validateUser
};
