const prisma = require("../lib/prisma");

async function getDashboardStats() {
  const totalProducts =
    await prisma.product.count();

  const totalCategories = 
    await prisma.category.count();

  const activeProducts = 
    await prisma.product.count({
      where: {
        status: true,
      },
     });

  const inactiveProducts = 
    await prisma.product.count({
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

async function createAdmin(data) {
  return await prisma.admin.create({
    data,
  });
}

async function getAdminByEmail(email) {
  return await prisma.admin.findUnique({
    where: {
      email,
    },
  });
}

module.exports = {
  getDashboardStats,
  createAdmin,
  getAdminByEmail,
};
