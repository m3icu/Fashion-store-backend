const jwt = require("jsonwebtoken");

function generateToken(admin) {
  return jwt.sign(
    {
      id: admin.id,
      email: admin.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  };
}

module.exports = {
  generateToken,
};
