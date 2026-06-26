const prisma = require("../lib/prisma");

async function createOrder(customerId) {
const cartItems = await prisma.cart.findMany({
where: {
customerId,
},
include: {
variant: {
include: {
product: true,
},
},
},
});

if (cartItems.length === 0) {
throw new Error("Cart is empty");
}

for (const item of cartItems) {
if (item.variant.stock < item.quantity) {
throw new Error(
`${item.variant.sku} stock tidak cukup`
);
}
}

const totalAmount = cartItems.reduce(
(sum, item) =>
sum +
Number(item.variant.price) *
item.quantity,
0
);

const order = await prisma.$transaction(
  async (tx) => {
    const order = await tx.order.create({
      data: {
        customerId,
        totalAmount,
      },
    });


  for (const item of cartItems) {
    await tx.orderItem.create({
      data: {
        orderId: order.id,
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.variant.price,
      },
    });

    await tx.productVariant.update({
      where: {
        id: item.variantId,
      },
      data: {
        stock: {
          decrement: item.quantity,
        },
      },
    });
  }

  await tx.cart.deleteMany({
    where: {
      customerId,
    },
  });

  return tx.order.findUnique({
    where: {
      id: order.id,
    },
    include: {
      items: {
        include: {
          variant: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
}

);

return order;
}

async function getOrders(customerId) {
return prisma.order.findMany({
where: {
customerId,
},
include: {
items: {
include: {
variant: {
include: {
product: true,
},
},
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
variant: {
include: {
product: true,
},
},
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
variant: {
include: {
product: true,
},
},
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
