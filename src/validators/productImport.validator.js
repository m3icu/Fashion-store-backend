const Joi = require("joi");

const importProductSchema = Joi.object({
  sku: Joi.string().trim().required(),
  name: Joi.string().trim().min(2).required(),
  description: Joi.string().allow("", null),

  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).default(0),
  weight: Joi.number().min(0).default(0),

  isActive: Joi.boolean().default(true),

  categorySlug: Joi.string().trim().required(),
});

module.exports = {
  importProductSchema,
};