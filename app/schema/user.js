const Joi = require('joi');

// use JOI t0 perfom the external validations
module.exports = {
  signUpSchema: Joi.object({
    first_name: Joi.string().required().messages({
      'string.base': 'field should be a String',
      'any.required': 'first_name is required',
    }),
    last_name: Joi.string().required().messages({
      'string.base': 'field should be a String',
      'any.required': 'last_name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'field should be a String',
      'any.required': 'email is required',
    }),
    phone_number: Joi.string().length(11).required().messages({
      'number.base': 'field should be a Number',
      'length.base': 'phone_number should be 11 digits',
      'any.required': 'phone_number is required',
    }),
    password: Joi.required().messages({
      'any.required': 'password is required',
    }),
    role: Joi.optional().messages({
      'string.base': 'field should be a String',
    }),
  }),
  signInSchema: Joi.object({
    email: Joi.string().email().required().messages({
      'string.base': 'field should be a String',
      'any.required': 'email is required',
    }),
    password: Joi.required().messages({
      'any.required': 'password is required',
    }),
  }),
};
