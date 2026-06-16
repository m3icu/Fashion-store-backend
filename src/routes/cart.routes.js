const express = require("express");
const router = express.Router();

const cartController = require(
  "../controllers/cart.controller"
);

const customerAuth = require(
  "../middlewares/customerAuth.middleware"
);

//ADD TO CART
router.post(
  "/",
  customerAuth,
  cartController.addToCart
);

//GET CART
router.get(
  "/",
  customerAuth,
  cartController.getCart
);

//GET CART SUMMARY
router.get(
  "/summary",
  customerAuth,
  cartController.getCartSummary
);

//UPDATE CART ITEM
router.patch(
  "/:id",
  customerAuth,
  cartController.updateCartItem
);

//REMOVE CART ITEM
router.delete(
  "/:id",
  customerAuth,
  cartController.removeCartItem
);

module.exports = router;