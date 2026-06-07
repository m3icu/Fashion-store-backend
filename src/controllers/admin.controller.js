const bcrypt = require("bcryptjs");

const adminService = require(
  "../services/admin.service"
);

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const admin =
      await adminService.createAdmin({
        name,
        email,
        password: hashedPassword,
      });

    res.status(201).json({
      success: true,
      data: admin,
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
  register,
};