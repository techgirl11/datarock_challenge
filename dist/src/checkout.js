"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkout = void 0;
class Checkout {
    /**
     * Initializes a new instance of the Checkout class.
     *
     * @param {PricingRule[]} pricingRules - The pricing rules to be applied to the checkout.
     * @return {void} No return value, the instance is initialized in place.
     */
    constructor(pricingRules) {
        this.cartItems = [];
        this.pricingRules = pricingRules;
    }
    /**
     * Returns the list of items currently in the cart.
     *
     * @return {CartItem[]} The list of cart items.
     */
    getCartItems() {
        return this.cartItems;
    }
    /**
     * Scans a product and adds it to the cart. If the product already exists in the cart,
     * its quantity is incremented. Otherwise, a new cart item is created with a quantity of 1.
     *
     * @param {Product} product - The product to be scanned and added to the cart.
     * @return {void} This function does not return anything.
     */
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
     * Applies all pricing rules to the cart items.
     *
     * @return {void} No return value, the cart items are modified in place.
     */
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
