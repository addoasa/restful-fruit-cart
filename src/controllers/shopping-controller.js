module.exports = {
	getInventory : (req,res)=>{
		res.header({
			'content-type': 'text/html'
		});
		res.statusCode(200).send(path.join(__dirname,'../public/index.html'));
	},
	addToCart: (req,res)=>{
		res.header({
			'content-type': 'application/json'
		});
    console.log('item successfully added.');
    console.log(req.body);
    res.locals.shoppingCart = req.body;
		res.send('good job');
	},
	clearCart: (req,res)=>{
    res.locals.shoppingCart = [];
    console.log("cart was emptied.")
    res.send();

	}
};