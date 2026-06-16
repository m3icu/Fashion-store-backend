const productService = require("../services/product.service");

async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
     }
    
     const imageUrl =
       `${req.protocol}://${req.get("host")}/uploads/products/${req.file.filename}`;

     res.status(200).json({
       success: true,
       imageUrl,
     });
   } catch (error) {
     res.status(500).json({
       success: false,
       message: error.message,
     });
   }
  }

async function getProducts(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const sort = req.query.sort || "newest";

    const result = await productService.getProducts(
      page,
      limit,
      search,
      category,
      sort
    );

    res.json({
      success: true,
      data: result.products,
      pagination :result.pagination,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getProductById(req, res) {
  try {
    const product = await productService.getProductById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function createProduct(req, res) {
  try {
    const product = await productService.createProduct(
      req.body
    );

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    await productService.deleteProduct(
      req.params.id
    );

    res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateProductImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/products/${req.file.filename}`;
    
    const product = 
      await productService.updateProductImage(
        req.params.id,
        imageUrl
      );

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  updateProductImage,
};