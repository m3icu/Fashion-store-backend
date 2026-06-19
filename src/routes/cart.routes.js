const express = require("express");
const router = express.Router();

const cartController = require(
  "../controllers/cart.controller"
);

const customerAuth = require(
  "../middlewares/customerAuth.middleware"
);

//ADD TO CART
/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add product to cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *         schema:
 *           type: object
 *           required:
 *             - productId
 *             - quantity
 *           properties:
 *             productId:
 *               type: string
 *               example: 90a14a5a-b3bc-4830-ab34-xxxxxxxxxxxx
 *             quantity:
 *               type: integer
 *               example: 2
 *     responses:
 *       201:
 *         description: Product added to cart
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  customerAuth,
  cartController.addToCart
);

//GET CART
/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get customer cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  customerAuth,
  cartController.getCart
);

//GET CART SUMMARY
/**
 * @swagger
 * /cart/summary:
 *   get:
 *     summary: Get cart summary
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart summary retrieved successfullyu
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/summary",
  customerAuth,
  cartController.getCartSummary
);
/**
 * @swagger
 * /cart/{id}:
 *   patch:
 *     summary: Update cart item quantity
 *     tags:
 *       - Cart
 *     security:
 *       - beaereAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestedBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       404:
 *         description: Cart item not found
 *       401:
 *         description: Unauthorized
 */
//UPDATE CART ITEM
router.patch(
  "/:id",
  customerAuth,
  cartController.updateCartItem
);

//REMOVE CART ITEM
/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Remove item from cart
 *     tags:
 *       - Cart
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
 *         description: Cart item removed successfully
 *       404:
 *         description: Cart item not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/:id",
  customerAuth,
  cartController.removeCartItem
);

module.exports = router;