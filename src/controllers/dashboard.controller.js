const dashboardService = require(
  "../services/dashboard.service"
);

async function getDashboardStats(req, res) {
  try {
    const stats = 
      await dashboardService.getDashboardStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(error);
  
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getDashboardStats,
};
