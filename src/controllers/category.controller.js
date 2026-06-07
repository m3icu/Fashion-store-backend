const categoryService = require("../services/category.service");

async function getCategories(req, res) {
  try {
    const categories = await categoryService.getCategories();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getCategoryById(req, res) {
  try {
    const category = await categoryService.getCategoryById(
      req.params.id
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function createCategory(req, res) {
  try {
    const category = await categoryService.createCategory(
      req.body
    );

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateCategory(req, res) {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteCategory(req, res) {
  try {
    await categoryService.deleteCategory(
      req.params.id
    );

    res.json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};