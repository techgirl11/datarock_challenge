import { Product } from "./models";
import { Checkout } from "./checkout";
import { ThreeForTwoDeal } from "./discount";

const sIpad: Product = { sku: "ipd", name: "Super iPad", price: 549.99 };
const appleTv: Product = { sku: "atv", name: "Apple TV", price: 109.50 };

const atvThreeForTwo = new ThreeForTwoDeal(appleTv.sku);

const checkout = new Checkout([atvThreeForTwo]);

checkout.scan(sIpad);
checkout.scan(appleTv);
console.log(checkout.total())
