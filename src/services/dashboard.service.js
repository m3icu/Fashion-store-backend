const prisma = require("../lib/prisma");

async function getStatistics() {
  const [
    totalProducts,
    totalVariants,
    totalCustomers,
    totalOrders,
    pendingOrders,
    paidOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    revenue,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.productVariant.count(),
    prisma.customer.count(),
    prisma.order.count(),
    prisma.order.count({
      where: {
        status: "PENDING",
      },
    }),
    prisma.order.count({
      where: {
        status: "PAID",
      },
    }),
    prisma.order.count({
      where: {
        status: "PROCESSING",
      },
    }),
    prisma.order.count({
      where: {
        status: "SHIPPED",
      },
    }),
    prisma.order.count({
      where: {
        status: "DELIVERED",
      },
    }),
    prisma.order.count({
      where: {
        status: "CANCELLED",
      },
    }),
    prisma.order.aggregate({
      where: {
        status: {
          in: [
            "PAID",
            "PROCESSING",
            "SHIPPED",
            "DELIVERED",
          ],
        },
      },
      _sum: {
        totalAmount: true,
      },
    }),
  ]);

  return {
    totalProducts,
    totalVariants,
    totalCustomers,
    totalOrders,

    pendingOrders,
    paidOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
  
    totalRevenue:
      revenue._sum.totalAmount || 0,
  };
}

async function getRecentOrders() {
  return prisma.order.findMany({
    take: 5,

    orderBy: {
      createdAt: "desc",
    },
    
    select: {
      id: true,
      totalAmount: true,
      status: true,
      createdAt: true,

      customer: {
        select: {
          name: true,
        },
      },
    },
  });
}

module.exports = {
  getStatistics,
  getRecentOrders,
};