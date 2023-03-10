const Joi = require('joi');

const schema = Joi.object({
  'name.first': Joi.string().allow(''),
  'name.last': Joi.string().allow(''),
  age: Joi.number().allow(''),
  'contactDetails.number.whatsApp.number': Joi.number().allow(''),
  'contactDetails.email.primary': Joi.string().email(),
  'contactDetails.number.mobile.number': Joi.number().allow(''),
  nationality: Joi.string().allow(''),
  dob: Joi.any(),
  password: Joi.string()
});

module.exports = {
  schema
}