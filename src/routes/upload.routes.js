const express = require("express");
const router =  express.Router();

const upload = require("../middlewares/upload.middleware");
const uploadController = require("../controllers/upload.controller");

router.post(
  "/product-image",
  upload.single("image"),
  uploadController.uploadProductImage
);

module.exports = router;