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

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create order from cart
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order crreated succesfully
 *       400:
 *         description: Cart is empty
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  customerAuthMiddleware,
  orderController.createOrder
);

/**
 * @swagger
 * /orders/admin/all:
 *   get:
 *     summary: Get all orders (Admin)
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/admin/all",
  authMiddleware,
  orderController.getAllOrders
);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get customer orders
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 */
router.get(
  "/",
  customerAuthMiddleware,
  orderController.getOrders
);

/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Update order status
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - PAID
 *                   - PROCESSING
 *                   - SHIPPED
 *                   - DELIVERED
 *                   - CANCELLED
 *                 example: SHIPPED
 *     responses:
 *       200:
 *         description: Order status updates successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
router.patch(
  "/:id/status",
  authMiddleware,
  validate(updateOrderStatusSchema),
  orderController.updateOrderStatus
);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order detail
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200: 
 *         description: Order found
 *       404:
 *         description: Order not found
 */
router.get(
  "/:id",
  customerAuthMiddleware,
  orderController.getOrderById
);

module.exports = router;