const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    name: String,
    address: String,
    phone: String,
    items: [
      {
        productId: Number,
        quantity: Number,
      }
    ],
    orderDate: { type: Date, default: Date.now }
  });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;