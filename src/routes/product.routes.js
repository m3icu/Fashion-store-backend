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
const uploadExcel = require("../middlewares/excel-upload.middleware");

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: list of products
 */

router.get("/", productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get("/:id", productController.getProductById);

/**
 * @swagger
 * /products/upload:
 *   post:
 *     summary: Upload product image
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: image uploadad successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Image uploaded successfully
 *               imageUrl: /uploads/product-123.jpg
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Unauthorized
 */  
router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  productController.uploadImage);

/**
 * @swagger
 * /products/import:
 *   post:
 *     summary: Import products from Excel
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *                - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product imported successfully
 */
router.post(
  "/import",
  authMiddleware,
  uploadExcel.single("file"),
  productController.importProducts);

/**
 * @swagger
 * /products/import/commit:
 *   post:
 *     summary: Commit imported products
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Import committed successfully
 */
router.post(
  "/import/commit",
  authMiddleware,
  productController.commitImportController
);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Kaos Polos Premium
 *               description:
 *                 type: string
 *                 example: Kaos cotton combed 30s
 *               price:
 *                 type: number
 *                 example: 75000
 *               stock:
 *                 type: integer
 *                 example: 50
 *               categoryId:
 *                 type: string
 *                 example: 8d7e2f3b-1234-5678-90ab-cdef12345678
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", 
  authMiddleware,
  validate(createProductSchema),
  productController.createProduct);
router.put(
  "/:id/image",
  authMiddleware,
  upload.single("image"),
  productController.updateProductImage);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product updated
 */
router.put("/:id", 
  authMiddleware,
  validate(updateProductSchema),
  productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.delete("/:id", 
  authMiddleware,
  productController.deleteProduct);

module.exports = router;