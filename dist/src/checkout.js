"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkout = void 0;
class Checkout {
    constructor(pricingRules) {
        this.cartItems = [];
        this.pricingRules = pricingRules;
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
    applyDiscounts() {
        for (const discount of this.pricingRules) {
            discount.apply(this.cartItems);
        }
    }
    /**
     * Calculates the total cost of all items in the cart.
     *
     * @return {number} The total cost of all items in the cart.
     */
    total() {
        this.applyDiscounts();
        return Number(this.cartItems.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0).toFixed(2));
    }
}
exports.Checkout = Checkout;
