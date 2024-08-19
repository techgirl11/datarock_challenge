import { Checkout } from "../src/checkout";

const products = require("./fixtures/products.json");

describe("checkout class", () => {
  const checkout = new Checkout([]);
  test('checkout object has scan and total function', () => {
    expect(typeof checkout.scan).toBe("function");
    expect(typeof checkout.total).toBe("function");
  });
});

describe("test checkout functionality without pricing rules", () => {

    let checkoutWithoutPricingRules: any;
    beforeEach(() => {
      checkoutWithoutPricingRules = new Checkout([]);
    });
  
    test('total function should return 0 when cart is empty', () => {
      expect(checkoutWithoutPricingRules.getCartItems()).toEqual([]);
      expect(checkoutWithoutPricingRules.total()).toEqual(0);
    });
  
    test('scan function should add product to cart successfully and update total', () => {
      checkoutWithoutPricingRules.scan(products.vgaAdapter);
  
      expect(checkoutWithoutPricingRules.getCartItems().length).toBe(1);
  
      expect(checkoutWithoutPricingRules.getCartItems()[0].product.sku).toBe(products.vgaAdapter.sku);
      expect(checkoutWithoutPricingRules.getCartItems()[0].product.name).toBe(products.vgaAdapter.name);
      expect(checkoutWithoutPricingRules.getCartItems()[0].product.price).toBe(products.vgaAdapter.price);
      expect(checkoutWithoutPricingRules.getCartItems()[0].quantity).toEqual(1);
  
      expect(checkoutWithoutPricingRules.total()).toEqual(products.vgaAdapter.price);
    });
   
    test('scan function should add multiple products to cart', () => {
      checkoutWithoutPricingRules.scan(products.vgaAdapter);
      checkoutWithoutPricingRules.scan(products.sIpad);
      checkoutWithoutPricingRules.scan(products.appleTv);
  
      expect(checkoutWithoutPricingRules.getCartItems().length).toBe(3);
  
      expect(checkoutWithoutPricingRules.getCartItems()[0].product.sku).toBe(products.vgaAdapter.sku);
      expect(checkoutWithoutPricingRules.getCartItems()[0].product.name).toBe(products.vgaAdapter.name);
      expect(checkoutWithoutPricingRules.getCartItems()[0].product.price).toBe(products.vgaAdapter.price);
      expect(checkoutWithoutPricingRules.getCartItems()[0].quantity).toEqual(1);
  
      expect(checkoutWithoutPricingRules.getCartItems()[1].product.sku).toBe(products.sIpad.sku);
      expect(checkoutWithoutPricingRules.getCartItems()[1].product.name).toBe(products.sIpad.name);
      expect(checkoutWithoutPricingRules.getCartItems()[1].product.price).toBe(products.sIpad.price);
      expect(checkoutWithoutPricingRules.getCartItems()[1].quantity).toEqual(1);
  
      expect(checkoutWithoutPricingRules.getCartItems()[2].product.sku).toBe(products.appleTv.sku);
      expect(checkoutWithoutPricingRules.getCartItems()[2].product.name).toBe(products.appleTv.name);
      expect(checkoutWithoutPricingRules.getCartItems()[2].product.price).toBe(products.appleTv.price);
      expect(checkoutWithoutPricingRules.getCartItems()[2].quantity).toEqual(1);
  
      expect(checkoutWithoutPricingRules.total()).toEqual(products.appleTv.price + products.vgaAdapter.price + products.sIpad.price);
    });
  
    test('scan function should add same product multiple times to cart', () => {
      checkoutWithoutPricingRules.scan(products.macBookPro);
      checkoutWithoutPricingRules.scan(products.macBookPro);
      checkoutWithoutPricingRules.scan(products.macBookPro);
  
      expect(checkoutWithoutPricingRules.getCartItems().length).toBe(1);
  
      expect(checkoutWithoutPricingRules.getCartItems()[0].product.sku).toBe(products.macBookPro.sku);
      expect(checkoutWithoutPricingRules.getCartItems()[0].product.name).toBe(products.macBookPro.name);
      expect(checkoutWithoutPricingRules.getCartItems()[0].product.price).toBe(products.macBookPro.price);
      expect(checkoutWithoutPricingRules.getCartItems()[0].quantity).toEqual(3);
  
      expect(checkoutWithoutPricingRules.total()).toEqual(products.macBookPro.price * 3);
    });
  });