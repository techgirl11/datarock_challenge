# datarock_challenge

This project implements a checkout system that is capabe of implementing discount offers.

The project is build in Nodejs with Typescript and implements Jest for unit testing.

The following sample products are used for reference


| SKU     | Name        | Price    |
| --------|:-----------:| --------:|
| ipd     | Super iPad  | $549.99  |
| mbp     | MacBook Pro | $1399.99 |
| atv     | Apple TV    | $109.50  |
| vga     | VGA adapter | $30.00   |

Assumption
---------
In order to apply the discounts, the price in the cart item is modified to allow total function to calculate correct total against the quantities of those products in the cart.

Running the project
-----------------
The application does not any command line interface or graphical interface. To run please add your required input in ```src/index.ts``` build the application and run.

1. Clone the repo in your machine

2. install the dependencies
```npm install```

3. build the app
```npm run build```

4. run the app
```npm start```

Running the unit tests
---------

```npm run test```