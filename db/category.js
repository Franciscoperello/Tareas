const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    nombre: String,
});

const Category = mongoose.model('category', categorySchema);
module.exports=Category;