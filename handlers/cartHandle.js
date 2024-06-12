const Cart = require('./../db/cart');
const mongoose = require('mongoose');


async function addToCart(cartModel) {
    try {
        // Buscar el carrito existente del usuario
        let cart = await Cart.findOne({ userId: cartModel.userId });

        // Si no hay carrito existente, crea uno nuevo
        if (!cart) {
            cart = new Cart({
                userId: cartModel.userId,
                items: []
            });
        }

        // Buscar el ítem en el carrito
        const existingItemIndex = cart.items.findIndex(item => item.productId === cartModel.items[0].productId);

        // Si el ítem ya existe, incrementa la cantidad
        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += cartModel.items[0].quantity;
        } else {
            // Si el ítem no existe, añádelo al carrito
            cart.items.push(cartModel.items[0]);
        }

        // Guardar los cambios en el carrito
        await cart.save();
        
        return cart.toObject();
    } catch (error) {
        console.error('Error adding product to the cart:', error);
        throw new Error('Error adding product to the cart');
    }
}

async function getCartByUserId(userId) {
    try {
        const cart = await Cart.findOne({ userId: userId });
        return cart ? cart.toObject() : null;
    } catch (error) {
        console.error('Error getting cart:', error);
        throw new Error('Error getting cart');
    }
}

async function deleteCartByUserId(userId) {
    try {
        await Cart.deleteOne({ userId: userId });
        console.log(`Cart for user ${userId} deleted successfully`);
    } catch (error) {
        console.error('Error deleting cart:', error);
        throw new Error('Error deleting cart');
    }
}

async function removeProductFromCart(userId, productId) {
    try {
        // Convertir productId a número
        productId = parseInt(productId);

        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            throw new Error(`Cart not found for user ${userId}`);
        }
        
        const index = cart.items.findIndex(item => item.productId === productId);
        if (index === -1) {
            throw new Error(`Product ${productId} not found in cart for user ${userId}`);
        }

        cart.items.splice(index, 1);
        await cart.save();
        console.log(`Product ${productId} removed from cart for user ${userId} successfully`);
    } catch (error) {
        console.error('Error removing product from cart:', error);
        throw new Error('Error removing product from cart');
    }
}

async function decreaseProductQuantity(userId, productId, quantityToRemove) {
    try {
        // Convertir productId a número
        productId = parseInt(productId);

        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            throw new Error(`Cart not found for user ${userId}`);
        }
        
        const index = cart.items.findIndex(item => item.productId === productId);
        if (index === -1) {
            throw new Error(`Product ${productId} not found in cart for user ${userId}`);
        }

        const currentItem = cart.items[index];
        if (currentItem.quantity <= quantityToRemove) {
            // Si la cantidad a eliminar es mayor o igual que la cantidad actual,
            // eliminamos el producto del carrito
            cart.items.splice(index, 1);
        } else {
            // Si la cantidad a eliminar es menor que la cantidad actual,
            // simplemente reducimos la cantidad del producto en el carrito
            currentItem.quantity -= quantityToRemove;
        }

        await cart.save();
        console.log(`Quantity of product ${productId} decreased by ${quantityToRemove} for user ${userId} successfully`);
    } catch (error) {
        console.error('Error decreasing product quantity in cart:', error);
        throw new Error('Error decreasing product quantity in cart');
    }
}

async function increaseProductQuantity(userId, productId) {
    try {
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            throw new Error(`Cart not found for user ${userId}`);
        }

        const index = cart.items.findIndex(item => item.productId === parseInt(productId));
        if (index === -1) {
            throw new Error(`Product ${productId} not found in cart for user ${userId}`);
        }

        cart.items[index].quantity += 1;
        await cart.save();
        console.log(`Quantity of product ${productId} increased by 1 for user ${userId} successfully`);
    } catch (error) {
        console.error('Error increasing product quantity in cart:', error);
        throw new Error('Error increasing product quantity in cart');
    }
}

async function getTotalProductsInCart(userId) {
    try {
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            throw new Error(`Cart not found for user ${userId}`);
        }

        // Suma de las cantidades de todos los productos en el carrito
        const totalProducts = cart.items.reduce((total, item) => total + item.quantity, 0);

        return totalProducts;
    } catch (error) {
        console.error('Error getting total products in cart:', error);
    }
}

async function addToCartByUserId(userId, productId) {
    try {
        console.log('userId:', userId);
        console.log('productId:', productId);

        // Buscar el carrito existente del usuario
        let cart = await Cart.findOne({ userId: userId });

        // Si no hay carrito existente, crea uno nuevo
        if (!cart) {
            console.log('No existing cart found, creating a new one.');
            cart = new Cart({
                userId: userId,
                items: []
            });
        }

        // Buscar el ítem en el carrito
        const existingItem = cart.items.find(item => item.productId.toString() === productId.toString());

        // Si el ítem ya existe, incrementa la cantidad
        if (existingItem) {
            console.log('Item found in cart, incrementing quantity.');
            existingItem.quantity++;
        } else {
            // Si el ítem no existe, añádelo al carrito
            console.log('Item not found in cart, adding new item.');
            cart.items.push({ productId: productId, quantity: 1 });
        }

        // Guardar los cambios en el carrito
        await cart.save();
        console.log('Cart after update:', cart);

        return cart.toObject();
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw new Error('Error adding product to cart');
    }
}

module.exports = {increaseProductQuantity, addToCart, getCartByUserId, deleteCartByUserId, removeProductFromCart, decreaseProductQuantity, getTotalProductsInCart, addToCartByUserId };
