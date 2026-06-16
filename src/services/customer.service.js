const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// CREATE CUSTOMER
async function createCustomer(data) {

  const { name, email, password, phone, address } = data;

  //cek email ada ato tidak
  const existingCustomer = await prisma.customer.findUnique({
    where: { email },
  });

  if (existingCustomer) {
    throw new Error("Email already registered");
  }

  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const customer = await prisma.customer.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return customer;
}

//GET ALL CUSTOMERS
async function getAllCustomers() {
  return await prisma.customer.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      createdAt: true,
    },
  });
}

//GET CUSTOMER BY ID
async function getCustomerById(id) {
  const customer = await prisma.customer.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      createdAt: true,
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
}

//UPDATE CUSTOMER
async function updateCustomer(id, data) {
  const existingCustomer = await prisma.customer.findUnique({
    where: { id },
  });

  if (!existingCustomer) {
    throw new Error("Customer not found");
  }
   
  if (data.password) {
    data.password = await bcrypt.hash(
      data.password,
      10
    );
  }

  return await prisma.customer.update({
    where: { id },
    data,
  });
}

//DELETE CUSTOMER
async function deleteCustomer(id) {
  const existingCustomer = await prisma.customer.findUnique({
    where: { id },
  });

  if (!existingCustomer) {
    throw new Error("Customer not found");
  }

  return await prisma.customer.delete({
    where: { id },
  });
}

//LOGIN CUSTOMER
async function loginCustomer(email, password) {
  const customer = 
    await prisma.customer.findUnique({
      where: { email },
    });

  if (!customer) {
    throw new Error("Email not found");
  }

  const validPassword = 
    await bcrypt.compare(
      password,
      customer.password
    );

  if (!validPassword) {
    throw new Error("Wrong password");
  }

  const token = jwt.sign(
    {
      id: customer.id,
      email: customer.email,
      role: "CUSTOMER",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    customer: {
      id: customer.id,
      name: customer.name,
      email: customer.email,
    },
  };
}

//GET ME
async function getMe(customerId) {
  const customer = 
    await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
      },
    });

  if (!customer) {
    throw new Error(
      "Customer not found"
    );
  }

  return customer;
}

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  loginCustomer,
  getMe,
};

