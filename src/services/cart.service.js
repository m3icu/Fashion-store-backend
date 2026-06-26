const prisma = require("../lib/prisma")

//ADD TO CART
async function addToCart(data) {
  const {
    customerId,
    variantId,
    quantity,
  } = data;

  //cek customer
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  //cek product
  const variant =
    await prisma.productVariant.findUnique({
      where: {
        id: variantId,
      },
    });

  if (!variant) {
    throw new Error("Variant not found");
  }

  //cek item sudah ada di cart
  const existingCart = await prisma.cart.findFirst({
    where: {
      customerId,
      variantId,
    },
  });

  if (existingCart) {
    return await prisma.cart.update({
      where: {
        id: existingCart.id,
      },
      data: {
        quantity:
          existingCart.quantity + quantity,
      },
    });
  }

  return await prisma.cart.create({
    data: {
      customerId,
      variantId,
      quantity,
    },
  });
}

//GET CART BY CUSTOMER
async function getCartByCustomer(customerId) {
  return await prisma.cart.findMany({
    where: {
      customerId,
    },
    include: {
      variant: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });
}

//GET CART
async function getCart(customerId) {
  return await prisma.cart.findMany({
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
}

//UPDATE CART ITEM
async function updateCartItem(cartId, customerId, quantity) {
  if (quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }
      
  const cartItem = await prisma.cart.findFirst({
    where: {
      id: cartId,
      customerId,
    },
  });

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  const updatedCart = await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      quantity,
    },
    include: {
      variant: {
        include: {
          product: true,
        },
      },
    },
  });

  return updatedCart;
}

//REMOVE CART ITEM
async function removeCartItem(
  cartId,
  customerId
) {
  const cartItem = 
    await prisma.cart.findFirst({
      where: {
        id: cartId,
        customerId,
      },
    });

  if (!cartItem) {
    throw new Error(
      "Cart item not found"
    );
  }

  await prisma.cart.delete({
    where: {
      id: cartId,
    },
  })

  return true;
}

//GET CART SUMMARY
async function getCartSummary(customerId) {
  const cartItems = await prisma.cart.findMany({
    where: {
      customerId,
    },
    include: {
      variant: true,
    },
  });

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (sum, item) => 
        sum + 
        Number(item.variant.price) *
        item.quantity,
     0
  );

  return {
    totalItems,
    subtotal,
  };
}

module.exports = {
  addToCart,
  getCartByCustomer,
  getCart,
  updateCartItem,
  removeCartItem,
  getCartSummary,
};





