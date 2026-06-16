const prisma = require("../lib/prisma");

async function getDashboardStats() {
  const totalProducts = await prisma.product.count();
 
  const totalCategories = await prisma.category.count();

  const activeProducts = await prisma.product.count({
    where: {
      status: true,
    },
  });
  
  const inactiveProducts = await prisma.product.count({
    where: {
      status: false,
    },
  });

  return {
    totalProducts,
    totalCategories,
    activeProducts,
    inactiveProducts,
  };
}

module.exports = {
  getDashboardStats,
};