const prisma = require("../lib/prisma");

async function createOrder(customerId) {
  const cartItems = await prisma.cart.findMany({
    where: {
      customerId,
    },
    include: {
      product: true,
    },
  });

  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.product.price) *
      item.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      customerId,
      totalAmount,
    },
  });

  for (const item of cartItems) {
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
      },
    });
  }
  
  await prisma.cart.deleteMany({
    where: {
      customerId,
    },
  });

  return await prisma.order.findUnique({
    where: {
      id: order.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

async function getOrders(customerId) {
  return prisma.order.findMany({
    where: {
      customerId,
    },
    include: {
      items:  {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function getOrderById(
  orderId,
  customerId
) {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
}

async function getAllOrders() {
  return prisma.order.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function updateOrderStatus(
  orderId,
  status
) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};