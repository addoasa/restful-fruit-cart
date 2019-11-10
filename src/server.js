const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const path = require('path');
const { getInventory, addToCart, clearCart, getQuoteAndApplyDiscounts } = require('./controllers/shopping-controller');
const bodyParser = require('body-parser');
// Help serve static assets in public folder
app.use(express.static('public'));
app.use(bodyParser.json());
// Routes
app.get('/', getInventory);
app.post('/addToCart', addToCart , getQuoteAndApplyDiscounts);
app.get('/clearCart', clearCart, getQuoteAndApplyDiscounts);
// app.get("/getQuoteAndApplyDiscounts", getQuoteAndApplyDiscounts);
// Server running
app.listen(PORT,()=>{
	console.log(`Application listening on localhost port ${PORT}`);
});
