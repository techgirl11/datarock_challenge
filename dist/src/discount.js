"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeItemWithPurchase = exports.BulkDiscount = exports.ThreeForTwoDeal = void 0;
const constants_1 = require("./constants");
class ThreeForTwoDeal {
    constructor(productSku) {
        this.productSku = productSku;
    }
    /**
     * Applies a three for two deal pricing rule to the given cart items.
     *
     * @param {CartItem[]} cartItems - The list of cart items to apply the pricing rule to.
     * @return {void} No return value, the cart items are modified in place.
     */
    apply(cartItems) {
        const item = cartItems.find(cartItem => cartItem.product.sku === this.productSku);
        if (item && item.quantity >= constants_1.MIN_DEAL_QUANTITY) {
            const discountQuantity = Math.floor(item.quantity / constants_1.MIN_DEAL_QUANTITY) * 1;
            const discountedAmount = item.product.price * (item.quantity - discountQuantity);
            // reduce the price of the item so that MIN_DEAL_QUANTITY(nth) item is free
            item.product.price = discountedAmount / item.quantity;
        }
    }
}
exports.ThreeForTwoDeal = ThreeForTwoDeal;
class BulkDiscount {
    constructor(productSku, newPrice) {
        this.productSku = productSku;
        this.newPrice = newPrice;
    }
    /**
     * Applies a bulk discount pricing rule to the given cart items.
     *
     * @param {CartItem[]} cartItems - The list of cart items to apply the pricing rule to.
     * @return {void} No return value, the cart items are modified in place.
     */
    apply(cartItems) {
        const item = cartItems.find(cartItem => cartItem.product.sku === this.productSku);
        if (item && item.quantity > constants_1.BULK_DEAL_MIN_QUANTITY) {
            item.product.price = this.newPrice;
        }
    }
}
exports.BulkDiscount = BulkDiscount;
// Bundle Free VGA Adapter with every MacBook Pro
class FreeItemWithPurchase {
    constructor(purchasedProductSku, freeProduct) {
        this.purchasedProductSku = purchasedProductSku;
        this.freeProduct = freeProduct;
    }
    /**
     * Applies a free item with purchase pricing rule to the given cart items.
     *
     * @param {CartItem[]} cartItems - The list of cart items to apply the pricing rule to.
     * @return {void} No return value, the cart items are modified in place.
     */
    apply(cartItems) {
        const macBookPro = cartItems.find(cartItem => cartItem.product.sku === this.purchasedProductSku);
        if (macBookPro) {
            const existingVGAAdapter = cartItems.find(cartItem => cartItem.product.sku === this.freeProduct.sku);
            if (!existingVGAAdapter) {
                cartItems.push({ product: this.freeProduct, quantity: 1 });
            }
            else {
                if (macBookPro.quantity > existingVGAAdapter.quantity) {
                    // add a free VGA Adapter for every MacBook Pro
                    existingVGAAdapter.quantity = macBookPro.quantity;
                }
                else if (existingVGAAdapter.quantity > macBookPro.quantity) {
                    // if there are more VGA Adapters than MacBook Pro then every extra adapter will be paid for
                    existingVGAAdapter.product.price = (existingVGAAdapter.quantity - macBookPro.quantity) * existingVGAAdapter.product.price / existingVGAAdapter.quantity;
                }
                else {
                    existingVGAAdapter.product.price = 0;
                }
            }
        }
    }
}
exports.FreeItemWithPurchase = FreeItemWithPurchase;
