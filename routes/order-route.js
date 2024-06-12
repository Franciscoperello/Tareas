const express = require("express");
const router = express.Router();
const Order = require("./../db/order");
const { createOrder, getOrderByUserId, getAllOrders } = require('./../handlers/orderHandle');

// Crear nuevo pedido
router.post('/orders', async (req, res) => {
    try {
        const order = await createOrder(req.body);
        res.status(201).send(order);
    } catch (error) {
        res.status(500).send('Error creating order');
    }
});

// Obtener pedidos por usuario
router.get('/orders/:userId', async (req, res) => {
    try {
        const orders = await getOrderByUserId(req.params.userId);
        res.send(orders);
    } catch (error) {
        res.status(500).send('Error retrieving orders');
    }
});

router.get('/orders', async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.send(orders);
    } catch (error) {
        res.status(500).send('Error retrieving all orders');
    }
});


module.exports = router;
