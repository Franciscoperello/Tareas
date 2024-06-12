
const Product = require("./../db/product")

async function addProduct(productModel){
    
    const lastProduct = await Product.findOne().sort({ id: -1 });

    const newId = lastProduct ? lastProduct.id + 1 : 1;

    let product = new Product({
        id: newId,
        ...productModel
    })

    await product.save();
    return product.toObject();
}

async function getProduct(){

    const products = await Product.find();
    return products.map(x=>x.toObject())
}

async function getProductById(id){

    const products = await Product.findOne({id: id});
    return products.toObject();
}

async function getProductByCategory(categoria) {

    const products = await Product.find({ categoria: categoria });
    return products.map(x=>x.toObject())
}

async function updateProduct(id,productModel){
    const filter = {id: id};
    await Product.findOneAndUpdate(filter, productModel);
}

module.exports={addProduct, getProduct, getProductById, getProductByCategory, updateProduct}