const express = require("express");
const router = express.Router();

const categoryController = require(
  "../controllers/category.controller"
);

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

const validate = require(
  "../middlewares/validate.middleware"
);

const {
  createCategorySchema,
  updateCategorySchema,
} = require(
  "../validators/category.validator"
);

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);
router.post(
  "/", 
    authMiddleware,
    validate(createCategorySchema),
    categoryController.createCategory
);
router.put( 
  "/:id", 
    authMiddleware,
    validate(updateCategorySchema),
    categoryController.updateCategory
);

router.delete(
  "/:id", 
    authMiddleware,
    categoryController.deleteCategory
);

module.exports = router;