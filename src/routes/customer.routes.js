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
router.post(
  "/",
  authMiddleware,
  customerController.createCustomer
);

//GET ALL CUSTOMERS
router.get(
  "/",
  authMiddleware,
  customerController.getAllCustomers
);

//GET ME
router.get(
  "/me",
  customerAuth,
  customerController.getMe
);

//GET CUSTOMER BY ID
router.get(
  "/:id",
  authMiddleware,
  customerController.getCustomerById
);

//UPDATE CUSTOMER
router.put(
  "/:id",
  authMiddleware,
  customerController.updateCustomer
);

//DELETE CUSTOMER
router.delete(
  "/:id",
  authMiddleware,
  customerController.deleteCustomer
);

//LOGIN CUSTOMER
router.post(
  "/login",
  validate(loginSchema),
  customerController.loginCustomer
);

module.exports = router;
