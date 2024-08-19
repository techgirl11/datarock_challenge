import { Product } from "./models";
import { Checkout } from "./checkout";
import { ThreeForTwoDeal, BulkDiscount, FreeItemWithPurchase } from "./discount";
import { BULK_DEAL_NEW_PRICE } from "./constants";

const sIpad: Product = { sku: "ipd", name: "Super iPad", price: 549.99 };
const macBookPro: Product = { sku: "mbp", name: "MacBook Pro", price: 1399.99 };
const appleTv: Product = { sku: "atv", name: "Apple TV", price: 109.50 };
const vgaAdapter: Product = { sku: "vga", name: "VGA Adapter", price: 30.00 };

const atvThreeForTwo = new ThreeForTwoDeal(appleTv.sku);
const iPadBulkDiscount = new BulkDiscount(sIpad.sku, BULK_DEAL_NEW_PRICE);
const vgaFreeWithMacBook = new FreeItemWithPurchase(macBookPro.sku, vgaAdapter);

const pricingRules = [atvThreeForTwo, iPadBulkDiscount, vgaFreeWithMacBook];

const checkout = new Checkout(pricingRules);
// provide input to see checkout function in action
checkout.scan(appleTv);
checkout.scan(appleTv);
checkout.scan(appleTv);
checkout.scan(vgaAdapter);

// checkout.scan(appleTv);
// checkout.scan(sIpad);
// checkout.scan(sIpad);
// checkout.scan(appleTv);
// checkout.scan(sIpad);
// checkout.scan(sIpad);
// checkout.scan(sIpad);

// checkout.scan(macBookPro);
// checkout.scan(vgaAdapter);
// checkout.scan(sIpad);

console.log(`The total payble amount is $${(checkout.total()).toFixed(2)}`);
