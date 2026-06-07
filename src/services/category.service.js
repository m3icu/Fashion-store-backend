const prisma = require("../lib/prisma");

async function createCategory(data) {
  return await prisma.category.create({
    data,
  });
}

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function getCategoryById(id) {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
}

async function updateCategory(id, data) {
  return await prisma.category.update({
    where: {
      id,
    },
    data,
  });
}

async function deleteCategory(id) {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};