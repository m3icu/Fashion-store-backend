async function uploadProductImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    res.status(201).json({
      success: true,
      imageUrl: `/uploads/products/${req.file.filename}`,
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
  uploadProductImage,
};