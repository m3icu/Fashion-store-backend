const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(email,password) {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    throw new Error("Email tidak ditemukan");
  }

  const validPassword = await bcrypt.compare(
    password,
    admin.password
  );

  if (!validPassword) {
    throw new Error("Password salah");
  }

  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    },
  };
}

async function getMe(adminId) {
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!admin) {
    throw new Error("Admin tidak ditemukan");
  }

  return admin;
}

module.exports = {
  login,
  getMe,
};
