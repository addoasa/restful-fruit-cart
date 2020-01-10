# RESTful Fruit Shopping Cart

## Getting Started

1) Navigate to the root directory of this app

2) Install needed dependencies by entering one of the following commands below in your terminal:

 ```npm install```

##### or 

```npm i```

 3) Once the dependencies are done installing, start up the app by entering the following command into your terminal:

```npm start```

4) To run tests on the application enter the following into your terminal:

```npm test```

## About

RESTful shopping API that allows clients to manage end-user shopping experiences
... 
(It's just a shopping cart.)
 
 ![alt text](https://i.postimg.cc/gcXrxQ4V/shoppingcart.gif)

Given a cart containing a collection of items selected from an inventory list, the API computes the total price an applies volume discounts when possible. For example: Apples are $2.00 each. A cart containing three apples (id “A”) would cost a total of $6.00... but a cart with eight apples would end up costing a total of $14.00 because of the 4 for $7.00 discount. 
(Some expensive fruit)

Browser Local Storage makes it so that two different users connecting to the API simultaneously cannot combine item counts to qualify for volume discounts.

The API exposes end-points that let the client:

-Start a new shopping-cart
-Add items by ID to a shopping-cart
-Retrieve the final total for a shopping-cart


## Using the application

#### Hover over the fruit you'd like to add to your shopping cart. Once you've chosen the fruits you want to purchase click on the "CHECKOUT" button on the top right of the screen to see your quote. 

#### To empty your cart, click on the "EMPTY CART" button at the top right corner of the screen.