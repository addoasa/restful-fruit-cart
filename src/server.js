const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const { getInventory, addToCart, clearCart, getQuoteAndApplyDiscounts } = require('./controllers/shopping-controller');
const bodyParser = require('body-parser');

// Help serve static assets in public folder
app.use(express.static('public'));
// middleware used to read POST request body containing shoppingcart in localstorage 
app.use(bodyParser.json());
// Routes
app.get('/', getInventory); //serve html
app.post('/addToCart', addToCart , getQuoteAndApplyDiscounts); // get cart from frontend, calculate price, and send price back
app.get('/clearCart', clearCart, getQuoteAndApplyDiscounts); 
// Server running
app.listen(PORT,()=>{
	console.log(`Application running on localhost ${PORT}`);
});
