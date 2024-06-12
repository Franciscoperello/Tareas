const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');

const port = 3000;

const userRoutes=require("./routes/user-route");
const productRoutes=require("./routes/product-route");
const categoryRoutes=require("./routes/category-route")
const cartRoutes=require("./routes/cart-route")
const orderRoutes=require("./routes/order-route")

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

async function connectDb() {
  try {
    await mongoose.connect('mongodb+srv://chanche:chanche1234@cluster0.ml0dexi.mongodb.net/eCommerce?retryWrites=true&w=majority', {
        dbName: 'eCommerce'});
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    process.exit(1);
  }
}

connectDb();

app.use(orderRoutes ,userRoutes, productRoutes, categoryRoutes, cartRoutes);

app.use('/assets', express.static(path.join(__dirname, 'assets')));