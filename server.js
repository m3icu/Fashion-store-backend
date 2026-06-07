require('dotenv').config();

const path = require("path");
const express = require('express');
const cors = require('cors');

const productRoutes = require('./src/routes/product.routes');
const categoryRoutes = require('./src/routes/category.routes');
const uploadRoutes = require
("./src/routes/upload.routes");
const authRoutes = require
("./src/routes/auth.routes");
const adminRoutes = require
("./src/routes/admin.routes");

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});