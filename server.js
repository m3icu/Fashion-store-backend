require('dotenv').config();

const path = require("path");
const express = require('express');
const cors = require('cors');

const productRoutes = require('./src/routes/product.routes');
const categoryRoutes = require('./src/routes/category.routes');
const uploadRoutes = require("./src/routes/upload.routes");
const authRoutes = require("./src/routes/auth.routes");
const adminRoutes = require("./src/routes/admin.routes");
const errorHandler = require("./src/middlewares/error.middleware");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const customerRoutes = require("./src/routes/customer.routes");
const cartRoutes = require("./src/routes/cart.routes");
const orderRoutes = require("./src/routes/order.routes");
const {
  swaggerUi,  
  specs,
} = require("./src/docs/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Vyra Grosir API Running'
  });
});

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use("/upload", uploadRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use('/dashboard', dashboardRoutes);
app.use("/customers", customerRoutes);
app.use("/cart", cartRoutes);
app.use("/orders",orderRoutes);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});

