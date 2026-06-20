const productService = require("../services/product.service");
const XLSX = require("xlsx");
const productImportService = require("../services/product-import.service");

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

async function importProducts(req, res) {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );
    const result = await productImportService.previewImport(rows);
    
    return res.status(200).json({
      success: true,
      ...result,
    });

  } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  
async function commitImportController(req, res, next) {
  try {
    const { validProducts } = req.body;
    
    const result = await productImportService.commitImport(validProducts);
   
    return res.status(200).json({
      success: true,
      message: "Import committed successfully",
      data: result,
    });

  } catch (err) {
    next(err);
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
  importProducts,
  commitImportController,
};