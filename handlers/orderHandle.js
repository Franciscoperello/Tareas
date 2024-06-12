
const Order = require("./../db/order")

async function getAllOrders() {
    try {
        const orders = await Order.find();
        return orders.map(order => order.toObject());
    } catch (error) {
        throw new Error('Error getting all orders');
    }
}

async function createOrder(orderData){
    try {
        const order = new Order(orderData);
        const savedOrder = await order.save();
        return savedOrder.toObject();
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Error creating order');
    }
}

async function getOrderByUserId(userId){
    try {
        const orders = await Order.find({ userId: userId });
        return orders.map(order => order.toObject());
    } catch (error) {
        console.error('Error getting orders:', error);
        throw new Error('Error getting orders');
    }
}
    


module.exports={getAllOrders, createOrder, getOrderByUserId}