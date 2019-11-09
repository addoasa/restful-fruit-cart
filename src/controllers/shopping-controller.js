const inventoryJSON = require('../serverInventoryJSONData.js');
module.exports = {
	getInventory : (req,res)=>{
		res.header({
			'content-type': 'text/html'
		});
		res.statusCode(200).send(path.join(__dirname,'../public/index.html'));
	},
	addToCart: (req,res,next)=>{
		res.header({
			'content-type': 'application/json'
		});
		console.log('item successfully added.');
		res.locals.shoppingCart = req.body;
		console.log('add', res.locals.shoppingCart);
		next();
	},
	clearCart: (req,res,next)=>{
		console.log('clear',res.locals.shoppingCart);
		res.locals.shoppingCart = [];
		console.log('Cart was emptied.');
		next();

	},
	getQuoteAndApplyDiscounts: (req,res)=>{
		let totalPrice = 0;
		const finalCart = res.locals.shoppingCart;
		// // first get the base price
		// console.log(inventoryJSON, "inventory")
		const lookForDiscountInThisObj = {};
		if(finalCart){
			for(let i = 0; i < finalCart.length; i++){
				if(lookForDiscountInThisObj[finalCart[i]]){
					lookForDiscountInThisObj[finalCart[i]]++;
				}else{
					lookForDiscountInThisObj[finalCart[i]] = 1;
				}
				for(let j = 0; j < inventoryJSON.length; j++){
					if(finalCart[i] === inventoryJSON[j].id){
						totalPrice = totalPrice + inventoryJSON[j].unit_price;
					}
				}
			}
		}
		console.log(totalPrice, 'price before discount');
		// then apply discounts if available
    console.log(lookForDiscountInThisObj, 'obj');
    // I chose to hard code the checking for discount conditions below (as opposed to iterating through/using JSON data to verify discounts) because it is uncertain to know the nature of every possible discount. While it would be nice to use JSON data to automate the discount checking process the discounts follow different rules.
		let discount;
		for(let key in lookForDiscountInThisObj){
			if(key === 'A' && lookForDiscountInThisObj[key] >= 4){
				discount = Math.floor(lookForDiscountInThisObj[key] / 4); 
				totalPrice = totalPrice - discount;
			}if(key === 'C' && lookForDiscountInThisObj[key] >= 6){
				discount = Math.floor(lookForDiscountInThisObj[key] / 6); 
				totalPrice = totalPrice - (1.5 * discount);
			}
		}
		console.log(totalPrice, 'price after discount');

		res.send(JSON.stringify(totalPrice));
		// res.send('anything?');

	}
};