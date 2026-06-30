const express = require("express");

const router = express.Router();

const dashboardController = require(
  "../controllers/dashboard.controller"
);

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

router.get(
  "/statistics",
  authMiddleware,
  dashboardController.getStatistics
);

router.get(
  "/recent-orders",
  authMiddleware,
  dashboardController.getRecentOrders
);

module.exports = router;
