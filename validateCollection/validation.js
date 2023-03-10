const Joi = require('joi');

const schema = Joi.object({
  Email: Joi.string().email().required(),
  'Mobile Phone': Joi.string().min(7).max(15).required()
}).options({ allowUnknown: true });

module.exports = {
  schema
};
