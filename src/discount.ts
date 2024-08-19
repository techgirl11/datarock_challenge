import { Product, CartItem, PricingRule } from "./models";
import { MIN_DEAL_QUANTITY, BULK_DEAL_MIN_QUANTITY } from "./constants";

export class ThreeForTwoDeal implements PricingRule {
    private productSku: string;
  
    constructor(productSku: string) {
      this.productSku = productSku;
    }
  
    /**
     * Applies a three for two deal pricing rule to the given cart items.
     *
     * @param {CartItem[]} cartItems - The list of cart items to apply the pricing rule to.
     * @return {void} No return value, the cart items are modified in place.
     */
    apply(cartItems: CartItem[]): void {
      const item = cartItems.find(cartItem => cartItem.product.sku === this.productSku);
      if (item && item.quantity >= MIN_DEAL_QUANTITY) {
        const discountQuantity = Math.floor(item.quantity / MIN_DEAL_QUANTITY) * 1;
        const discountedAmount = item.product.price * (item.quantity - discountQuantity);
        item.product.price = discountedAmount;
      }
    }
  }
  
  export class BulkDiscount implements PricingRule {
    private productSku: string;
    private newPrice: number;
  
    constructor(productSku: string, newPrice: number) {
      this.productSku = productSku;
      this.newPrice = newPrice;
    }
  
    /**
     * Applies a bulk discount pricing rule to the given cart items.
     *
     * @param {CartItem[]} cartItems - The list of cart items to apply the pricing rule to.
     * @return {void} No return value, the cart items are modified in place.
     */
    apply(cartItems: CartItem[]): void {
      const item = cartItems.find(cartItem => cartItem.product.sku === this.productSku);
      if (item && item.quantity > BULK_DEAL_MIN_QUANTITY) {
        item.product.price = this.newPrice;
      }
    }
  }
  
  // Bundle Free VGA Adapter with every MacBook Pro
  export class FreeItemWithPurchase implements PricingRule {
    private purchasedProductSku: string;
    private freeProduct: Product;
  
    constructor(purchasedProductSku: string, freeProduct: Product) {
      this.purchasedProductSku = purchasedProductSku;
      this.freeProduct = freeProduct;
    }
  
    /**
     * Applies a free item with purchase pricing rule to the given cart items.
     *
     * @param {CartItem[]} cartItems - The list of cart items to apply the pricing rule to.
     * @return {void} No return value, the cart items are modified in place.
     */
    apply(cartItems: CartItem[]): void {
      const macBookPro = cartItems.find(cartItem => cartItem.product.sku === this.purchasedProductSku);
      if (macBookPro) {
        const existingVGAAdapter = cartItems.find(cartItem => cartItem.product.sku === this.freeProduct.sku);
        if (!existingVGAAdapter) {
          cartItems.push({ product: this.freeProduct, quantity: 1 });
        } else {
            existingVGAAdapter.product.price = 0;
        }
      }
    }
  }

export { PricingRule };
