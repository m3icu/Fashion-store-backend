const Joi = require("joi");

const createProductSchema = Joi.object({
  sku: Joi.string().required(),

  name: Joi.string()
    .min(3)
    .max(100)
    .required(),

  slug: Joi.string().required(),

  description: Joi.string()
    .allow("", null),

  price: Joi.number()
    .positive()
    .required(),

  weight: Joi.number()
    .integer()
    .positive()
    .required(),

  status : Joi.boolean(),

  imageUrl: Joi.string()
    .allow("", null),

  categoryId: Joi.string()
    .required(),
});

module.exports = {
  createProductSchema,
};