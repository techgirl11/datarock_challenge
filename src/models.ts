/**
 * Interface for a Product
 */
export interface Product {
    sku: string;
    name: string;
    price: number;
}

/**
 * Interface for a CartItem
 */
export interface CartItem {
    product: Product;
    quantity: number;
}

/**
 * Interface for a DiscountRule
 */
export interface PricingRule {
    apply(cartItems: CartItem[]): void;
}
