const dashboardService = require("../services/dashboard.service");

async function getStatistics(req, res, next) {
  try {
    const statistics =
      await dashboardService.getStatistics();

    res.status(200).json({
      success: true,
      data: statistics,
    });
  } catch (error) {
    next(error);
  }
}

async function getRecentOrders(req, res, next) {
  try {
    const recentOrders = 
      await dashboardService.getRecentOrders();

    res.status(200).json({
      success: true,
      data: recentOrders,
    });

   } catch (error) {
     next(error);
   }
}

module.exports = {
  getStatistics,
  getRecentOrders,
};

      