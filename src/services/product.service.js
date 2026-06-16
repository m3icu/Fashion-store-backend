const fs = require("fs");
const path = require("path");
const prisma = require("../lib/prisma");
const slugify = require("slugify");

async function createProduct(data) {
  const slug = slugify(data.name, {
    lower: true,
    strict: true,
  });

  return await prisma.product.create({
    data: {
      ...data,
      slug,
    },
  });
}

async function getProducts(
  page = 1, 
  limit = 10,
  search = "",
  category = "",
  sort = "newest"
) {
  const skip = (page - 1) * limit;

  const where = {};

  if (search) {
     where.name = {
       contains: search,
       mode: "insensitive",
     };
  }

  if (category) {
     where.category = {
       slug: category,
     };
  }
  
  let orderBy = {
    createdAt: "desc",
  };

  if (sort === "oldest") { 
    orderBy = {
      createdAt: "asc",
    };
  }

  if (sort === "price_asc") {
    orderBy = {
      price: "asc",
    };
  }

  if (sort === "price_desc") {
    orderBy = {
      price: "desc",
    };
  }
 
  console.log("SORT =", sort);
  console.log("ORDERBY =", orderBy);

  const products = await prisma.product.findMany({
      where,
      skip,
      take: limit,
      include: {
        category: true,
      },
      orderBy,
  });
  
  const total = await prisma.product.count({
    where,
  });

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.imageUrl) {
    const filename =
      product.imageUrl.split("/").pop();

    const imagePath = path.join(
      process.cwd(),
      "uploads",
      "products",
      filename
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  return await prisma.product.delete({
    where: {
      id,
    },
  });
}

async function updateProductImage(id, imageUrl) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.imageUrl) {
    const filename = 
       product.imageUrl.split("/").pop();

    const imagePath = path.join(
      process.cwd(),
      "uploads",
      "products",
      filename
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  return await prisma.product.update({
    where: { id },
    data: {
      imageUrl,
    },
  });
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductImage,
};