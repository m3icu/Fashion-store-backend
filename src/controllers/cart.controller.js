const cartService = require("../services/cart.service");

//ADD TO CART
async function addToCart(req, res, next) {
  try {

    const customerId =
      req.customer.id;

    const cart = 
      await cartService.addToCart({
        customerId,
        variantId: req.body.variantId,
        quantity: req.body.quantity,
    });

    res.status(201).json({
      success: true,
      message: "Variant added to cart",
      data: cart,
    });

  } catch (error) {
    next(error);
  }
}

//GET CART
async function getCart(req, res, next) {
  try {
    const customerId = req.customer.id;
   
    const cart = await cartService.getCart(
      customerId
    );
 
    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
}

//UPDATE CART ITEM
async function updateCartItem(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const cart = await cartService.updateCartItem(
      id,
      req.customer.id,
      quantity
    );

    res.json ({
      success: true,
      message: "Cart updated",
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

//REMOVE CART ITEM
async function removeCartItem(
  req,
  res
) {
  try {
    await cartService.removeCartItem(
      req.params.id,
      req.customer.id
    );

    res.json({
      success: true,
      message: "Cart item removed",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

//GET CART SUMMARY
async function getCartSummary(
  req,
  res
) {
  try {
    const summary =
      await cartService.getCartSummary(
        req.customer.id
      );

    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}  

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  getCartSummary,
};