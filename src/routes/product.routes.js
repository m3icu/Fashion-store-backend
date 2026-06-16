const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createProductSchema,
  updateProductSchema,
} = require("../validators/product.validator");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  productController.uploadImage);
router.post("/", 
  authMiddleware,
  validate(createProductSchema),
  productController.createProduct);
router.put(
  "/:id/image",
  authMiddleware,
  upload.single("image"),
  productController.updateProductImage);
router.put("/:id", 
  authMiddleware,
  validate(updateProductSchema),
  productController.updateProduct);
router.delete("/:id", 
  authMiddleware,
  productController.deleteProduct);

module.exports = router;