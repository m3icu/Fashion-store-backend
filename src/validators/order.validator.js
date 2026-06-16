const Joi = require("joi");

const updateOrderStatusSchema = 
  Joi.object({
    status: Joi.string()
      .valid(
        "PENDING",
        "PAID",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED"
      )
      .required(),
    });

module.exports = {
  updateOrderStatusSchema,
};