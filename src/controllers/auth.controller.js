const authService = require(
  "../services/auth.service"
  );

async function login(req, res) {
  try {
    const result = 
      await authService.login(
        req.body.email,
        req.body.password
      );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}

async function getMe(req, res) {
  try {
    const admin = 
      await authService.getMe(
        req.admin.id
      );

    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}


module.exports = {
  login,
  getMe,
};
