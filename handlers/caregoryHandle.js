
const Category = require("./../db/category")

async function addCategory(categoryModel){
    let category = new Category({
        ...categoryModel
    })
    await category.save();
    return category.toObject();
}

async function getCategories(){
    const category = await Category.find();
    return category.map(x=>x.toObject())
}


module.exports={ getCategories, addCategory}