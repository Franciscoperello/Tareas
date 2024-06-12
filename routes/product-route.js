const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getProduct, getProductById, addProduct, getProductByCategory, updateProduct } = require('./../handlers/productHandle');

router.post('/addProduct', async (req, res) => {
    try {
      await addProduct(req.body);
      res.send(req.body);
    } catch (error) {
      res.status(500).send('Error adding product');
    }
});
  
router.get('/GetAllProducts', async (req, res) => {
    try {
      let products = await getProduct();
      res.send(products);
    } catch (error) {
      res.status(500).send('Error serching product');
    }
});

router.get('/GetProductById/:id', async (req, res) => {
    try {
      let product = await getProductById(req.params["id"]);
      res.send(product);
    } catch (error) {
      res.status(500).send('Error serching product by id');
    }
});

router.get('/GetProductsByCategory/:categoria', async (req, res) => {
  try {
    let product = await getProductByCategory(req.params["categoria"]);
    res.send(product);
  } catch (error) {
    res.status(500).send('Error serching product by categoria');
  }
});

router.put('/UpdateProduct/:id', async (req, res) => {
  try {
    await updateProduct(req.params["id"], req.body);
    res.send(req.body);
  } catch (error) {
    res.status(500).send('Error Actualizando Producto');
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../eCommerce/src/assets/fotoProductos');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const imagePath = `assets/fotoProductos/${req.file.filename}`;
  res.json({ imagePath });
  console.log(imagePath)
});

module.exports=router;