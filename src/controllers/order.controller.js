const orderService = require("../services/order.service");
  
async function createOrder(req, res) {
  try {
    const order = await orderService.createOrder(
      req.customer.id
    );

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await orderService.getOrders(
      req.customer.id
    );

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}

async function getOrderById(req, res) {
  try {
    const order = await orderService.getOrderById(
      req.params.id,
      req.customer.id
    );

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await orderService.getAllOrders();
 
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status
    );

    res.json({
      success: true,
      message: "Order status updated",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};