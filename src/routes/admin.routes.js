const express = require("express");
const router = express.Router();

const adminController = require(
  "../controllers/admin.controller");
const authMiddleware = require
  ("../middlewares/auth.middleware");
  

router.post(
  "/register",
  adminController.register
);
router.get(
  "/dashboard",
  authMiddleware,
  adminController.getDashboard
);

module.exports = router;