const prisma = require("../lib/prisma");

async function createProduct(data) {
  return await prisma.product.create({
    data,
  });
}

async function getProducts() {
  return await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
    },
  });
}

async function getProductById(id) {
  return await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
}

async function updateProduct(id, data) {
  return await prisma.product.update({
    where: {
      id,
    },
    data,
  });
}

async function deleteProduct(id) {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};