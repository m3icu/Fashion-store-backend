const prisma = require("../lib/prisma");

async function createAdmin(data) {
  return await prisma.admin.create({
    data,
  });
}

async function getAdminByEmail(email) {
  return await prisma.admin.findUnique({
    where: {
      email,
    },
  });
}

module.exports = {
  createAdmin,
  getAdminByEmail,
};
