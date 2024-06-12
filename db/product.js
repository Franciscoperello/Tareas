const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: Number,
    nombre: String,
    descripcion: String,
    caracteristicas: String,
    categoria: String,
    precio: Number,
    precioOferta: Number,
    imgSrc: String
});

const Product = mongoose.model('product', productSchema);
module.exports=Product;