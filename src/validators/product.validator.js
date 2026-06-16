const Joi = require("joi");

const createProductSchema = Joi.object({
  sku: Joi.string()
    .min(3)
    .max(50)
    .required(),

  name: Joi.string()
    .min(3)
    .max(255)
    .required(),

  description: Joi.string()
    .allow("")
    .optional(),

  price: Joi.number()
    .positive()
    .required(),

  weight: Joi.number()
    .integer()
    .min(0)
    .required(),

  status: Joi.boolean()
    .optional(),

  imageUrl: Joi.string()
    .uri()
    .optional(),
  
  categoryId: Joi.string()
    .uuid()
    .optional()
    .allow(null),
});

const updateProductSchema = Joi.object({
  sku: Joi.string()
    .min(3)
    .max(50),
  
  name: Joi.string()
    .min(3)
    .max(255),

  description: Joi.string()
    .allow(""),

  price: Joi.number()
    .positive(),

  weight: Joi.number()
    .integer()
    .min(0),

  status: Joi.boolean(),

  imageUrl: Joi.string()
    .uri(),

  categoryId: Joi.string()
    .uuid()
    .allow(null),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};


