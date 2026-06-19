const express = require("express");
const router = express.Router();

const authController = require(
  "../controllers/auth.controller"
);
const authMiddleware = require(
  "../middlewares/auth.middleware"
);
const validate = require(
  "../middlewares/validate.middleware"
);

const {
  loginSchema,
} = require(
  "../validators/auth.validator"
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Admin Login
 *     tags:
 *       - Authentication
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
 *                 example: admin@example.com
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
    authController.login
);
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current admin profile
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current admin profile
 *       401:
 *         description: Unauthorized
 */

router.get("/me", authMiddleware,authController.getMe);
 
module.exports = router;
