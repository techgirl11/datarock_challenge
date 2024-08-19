"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkout_1 = require("./checkout");
const sIpad = { sku: "ipd", name: "Super iPad", price: 549.99 };
const checkout = new checkout_1.Checkout();
checkout.scan(sIpad);
console.log(checkout.total());
