const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const path = require('path');

app.use(express.static('public'));
app.get("/",(req,res)=>{
  res.header({
    'content-type': 'text/html'
  })
  res.statusCode(200).send(path.join(__dirname,"../public/index.html"))
})
app.post("/addToCart",(req,res)=>{
  
})
app.post("/clearCart",(req,res)=>{

})

app.listen(PORT,()=>{
  console.log(`Application listening on localhost port ${PORT}`)
})