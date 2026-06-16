const express = require("express");

const router = express.Router();

const orderController = require(
  "../controllers/order.controller"
);
const customerAuthMiddleware = require(
  "../middlewares/customerAuth.middleware"
);
const authMiddleware = require(
  "../middlewares/auth.middleware"
);
const validate = require(
  "../middlewares/validate.middleware"
);
const {
  updateOrderStatusSchema,
} = require(
  "../validators/order.validator"
);
router.post(
  "/",
  customerAuthMiddleware,
  orderController.createOrder
);

router.get(
  "/admin/all",
  authMiddleware,
  orderController.getAllOrders
);

router.get(
  "/",
  customerAuthMiddleware,
  orderController.getOrders
);

router.patch(
  "/:id/status",
  authMiddleware,
  validate(updateOrderStatusSchema),
  orderController.updateOrderStatus
);

router.get(
  "/:id",
  customerAuthMiddleware,
  orderController.getOrderById
);

module.exports = router;