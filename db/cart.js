const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: Number,
    quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
    userId: Number,
    items: [cartItemSchema]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
