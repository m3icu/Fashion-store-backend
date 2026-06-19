const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const customerAuth = require("../middlewares/customerAuth.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  loginSchema,
} = require(
  "../validators/auth.validator"
);

//CREATE CUSTOMER
/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create customer
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer created successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authMiddleware,
  customerController.createCustomer
);

//GET ALL CUSTOMERS
/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customers retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  authMiddleware,
  customerController.getAllCustomers
);

//GET ME
/**
 * @swagger
 * /customers/me:
 *   get:
 *     summary: Get current customer profile
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/me",
  customerAuth,
  customerController.getMe
);

//GET CUSTOMER BY ID
/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer found
 *       404:
 *         description: Customer not found
 */
router.get(
  "/:id",
  authMiddleware,
  customerController.getCustomerById
);

//UPDATE CUSTOMER
/** 
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update customer
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200: 
 *         description: Customer updated successfully
 *       404:
 *         description: Customer not found
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/:id",
  authMiddleware,
  customerController.updateCustomer
);

//DELETE CUSTOMER
/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/:id",
  authMiddleware,
  customerController.deleteCustomer
);

//LOGIN CUSTOMER
/**
 * @swagger
 * /customers/login:
 *   post:
 *     summary: Customer Login
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: customer@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post(
  "/login",
  validate(loginSchema),
  customerController.loginCustomer
);

module.exports = router;
