// routes/cart-route.js
const express = require("express");
const router = express.Router();
const { decreaseProductQuantity, increaseProductQuantity, addToCartByUserId ,addToCart, getCartByUserId, removeProductFromCart, deleteCartByUserId, getTotalProductsInCart } = require('./../handlers/cartHandle');

router.post('/addToCart', async (req, res) => {
    try {
        await addToCart(req.body);
        res.send(req.body);
    } catch (error) {
        res.status(500).send('Error adding product to the cart');
    }
});

router.get('/getCartByUserId/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const cart = await getCartByUserId(userId);
        res.send(cart);
    } catch (error) {
        console.error('Error getting cart:', error);
        res.status(500).send('Error getting cart');
    }
});

router.delete('/deleteCartByUserId/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        await deleteCartByUserId(userId);
        res.send(`Cart deleted successfully for user ${userId}`);
    } catch (error) {
        console.error('Error deleting cart:', error);
        res.status(500).send('Error deleting cart');
    }
});

router.delete('/removeProductFromCart/:userId/:productId', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    try {
        await removeProductFromCart(userId, productId);
        res.send(`Product ${productId} removed from cart for user ${userId}`);
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).send('Error removing product from cart');
    }
});

router.get('/getTotalProductsInCart/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const totalProducts = await getTotalProductsInCart(userId);
        res.json({ totalProducts: totalProducts });
    } catch (error) {
        console.error('Error getting total products in cart:', error);
        res.status(500).json({ error: 'Error getting total products in cart' });
    }
});

router.post('/addToCart/:userId/:productId', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try {
        await addToCartByUserId(userId, productId);
        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Error adding product to cart' });
    }
});

router.put('/increaseProductQuantity/:userId/:productId', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try {
        await increaseProductQuantity(userId, productId);
        res.json({ message: `Quantity of product ${productId} increased for user ${userId} successfully` });
    } catch (error) {
        console.error('Error increasing product quantity in cart:', error);
        res.status(500).json({ error: 'Error increasing product quantity in cart' });
    }
});

router.put('/decreaseProductQuantity/:userId/:productId', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try {
        await decreaseProductQuantity(userId, productId, 1);
        res.json({ message: `Quantity of product ${productId} decreased by 1 for user ${userId} successfully` });
    } catch (error) {
        console.error('Error decreasing product quantity in cart:', error);
        res.status(500).json({ error: 'Error decreasing product quantity in cart' });
    }
});

module.exports = router;
