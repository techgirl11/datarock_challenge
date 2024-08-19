"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkout = void 0;
class Checkout {
    constructor() {
        this.cartItems = [];
    }
    getCartItems() {
        return this.cartItems;
    }
    scan(product) {
        const existingCartItem = this.cartItems.find((x) => x.product.sku === product.sku);
        if (existingCartItem) {
            existingCartItem.quantity++;
        }
        else {
            this.cartItems.push({ product, quantity: 1 });
        }
    }
    /**
     * Calculates the total cost of all items in the cart.
     *
     * @return {number} The total cost of all items in the cart.
     */
    total() {
        return Number(this.cartItems.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0).toFixed(2));
    }
}
exports.Checkout = Checkout;
