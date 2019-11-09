const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const path = require('path');
const shoppingController = require('./controllers/shopping-controller');
const bodyParser = require('body-parser');
// Help serve static assets in public folder
app.use(express.static('public'));
app.use(bodyParser.json());
// Routes
app.get("/", shoppingController.getInventory)
app.post("/addToCart", shoppingController.addToCart)
app.post("/clearCart", shoppingController.clearCart)

// Server running
app.listen(PORT,()=>{
  console.log(`Application listening on localhost port ${PORT}`)
})