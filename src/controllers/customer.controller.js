const customerService = require("../services/customer.service");

//CREATE CUSTOMER
async function createCustomer(req, res, next) {
  try {
    const customer = await customerService.createCustomer(req.body);

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    next(error);
  }
}

//GET ALL CUSTOMERS
async function getAllCustomers(req, res, next) {
  try {
    const customers = await customerService.getAllCustomers();

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    next(error);
  }
}

// GET CUSTOMER BY ID
async function getCustomerById(req, res, next) {
  try {
    const { id } = req.params;

    const customer = await customerService.getCustomerById(id);

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
}

//UPDATE CUSTOMER
async function updateCustomer(req, res, next) {
  try {
    const { id } = req.params;

    const customer = await customerService.updateCustomer(id, req.body);

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (error) {
    next(error);
  }
}

//DELETE CUSTOMER
async function deleteCustomer(req, res, next) {
  try {
    const { id } = req.params;
  
    await customerService.deleteCustomer(id);

    res.status(200).json({
      success: true,
      message: "Customer deleted succesfully",
    });
  } catch (error) {
    next(error);
  }
}

//LOGIN PASSWORD
async function loginCustomer(
  req,
  res,
  next
) {
  try {
    const {
      email,
      password,
    } = req.body;

    const result =
      await customerService.loginCustomer(
        email,
        password
      );
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

//GET ME
async function getMe(req, res, next) {
  try {
    const customer = 
      await customerService.getMe(
        req.user.id
      );

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
}

//CUSTOMER ME
async function getMe(req, res, next) {
  try {
    console.log("REQ CUSTOMER:");
    console.log(req.customer);

      const customer = 
      await customerService.getMe(
        req.customer.id
      );

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
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