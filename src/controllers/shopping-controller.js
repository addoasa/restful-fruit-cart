const { inventoryJSON } = require('../../public/inventoryJSONData');

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
		app.locals.shoppingCart = req.body;
		console.log('add',app.locals.shoppingCart);
		res.send('good job');
	},
	clearCart: (req,res)=>{
    console.log('clear',res.locals.shoppingCart)
		res.locals.shoppingCart = [];
		console.log('Cart was emptied.')
		res.send();

	},
	getQuoteAndApplyDiscounts: (req,res)=>{
		let totalPrice = 0
		const finalCart = res.locals.shoppingCart;
		// // first get the base price
		// for(let i = 0; i < finalCart.length; i++){
		// 	for(let j = 0; j < inventoryJSON.length; j++){
		// 		if(finalCart[i] === inventoryJSON[j].id){
		// 			totalPrice = totalPrice + inventoryJSON[j].unit_price;
		// 		}
		// 	}
		// }
		console.log(res.locals);
		// then apply discounts if available
		
		res.send(JSON.stringify(res.locals));
		// res.send('anything?');

	}
};