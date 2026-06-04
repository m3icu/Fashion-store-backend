require('dotenv').config();

const express = require('express');
const cors = require('cors');

const productRoutes = require('./src/routes/product.routes'); 
const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Vyra Grosir API Running'
  });
});


app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});