import { Product } from "./models";
import { Checkout } from "./checkout";

const sIpad: Product = { sku: "ipd", name: "Super iPad", price: 549.99 };

const checkout = new Checkout();

checkout.scan(sIpad);
console.log(checkout.total())
