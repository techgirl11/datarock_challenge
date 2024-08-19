import { Product, CartItem } from './models';
import { PricingRule } from './discount';

export class Checkout {

  private cartItems: CartItem[] = [];
  private pricingRules: PricingRule[];

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = pricingRules;
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  scan(product: Product): void {
    const existingCartItem = this.cartItems.find(
      (x) => x.product.sku === product.sku
    );
    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
  }

  applyDiscounts(): void {
    for (const discount of this.pricingRules) {
      discount.apply(this.cartItems);
    }
  }

  /**
   * Calculates the total cost of all items in the cart.
   *
   * @return {number} The total cost of all items in the cart.
   */
  total(): number {
    this.applyDiscounts();

    return Number(this.cartItems.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0).toFixed(2));
  }
}
