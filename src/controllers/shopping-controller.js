module.exports = {
  getInventory : (req,res)=>{
    res.header({
      'content-type': 'text/html'
    })
    res.statusCode(200).send(path.join(__dirname,"../public/index.html"))
  },
  addToCart: (req,res)=>{
  
  },
  clearCart: (req,res)=>{
  
  }
}