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
		console.log('Item successfully added.');
		// store localstorage shopping cart from post request body for later use
		res.locals.shoppingCart = req.body;
		console.log('added', res.locals.shoppingCart);
		next();
	},
	clearCart: (req,res,next)=>{
		res.locals.shoppingCart = [];
		console.log('Cart was emptied.');
		console.log('cleared',res.locals.shoppingCart);
		next();

	},
	getQuoteAndApplyDiscounts: (req,res)=>{
		let totalPrice = 0;
		const finalCart = res.locals.shoppingCart;
		// 1) first get the base price
		// store item count in object below to check for discounts later
		const lookForDiscountInThisObj = {};
		if(finalCart){
			// iterate through localstorage shopping cart sent from frontend, build object and sum up total
			for(let i = 0; i < finalCart.length; i++){
				if(lookForDiscountInThisObj[finalCart[i]]){
					lookForDiscountInThisObj[finalCart[i]]++;
				}else{
					lookForDiscountInThisObj[finalCart[i]] = 1;
				}
				// For each local storage shopping cart item loop through json of inventory data 
				// and add each price to the final cost (totalPrice)
				
				for(let j = 0; j < inventoryJSON.length; j++){
					if(finalCart[i] === inventoryJSON[j].id){
						totalPrice = totalPrice + inventoryJSON[j].unit_price;
					}
				}
			}
		}
		// 2) Then check for discounts
		console.log('$'+ totalPrice, 'price before discount');
		// then apply discounts if available
    console.log(lookForDiscountInThisObj, 'looking for discounts...');
		/* I chose to hard code the discount conditions below 
		(as opposed to iterating through/using JSON data to verify discounts) because it is uncertain 
		to know the nature of every possible discount. The discounts follow different rules. */
		let discount;
		// loop through shopping cart object we built earlier
		for(let key in lookForDiscountInThisObj){
			if(key === 'A' && lookForDiscountInThisObj[key] >= 4){
				discount = Math.floor(lookForDiscountInThisObj[key] / 4); 
				totalPrice = totalPrice - discount;
				console.log('discount applied');
			}if(key === 'C' && lookForDiscountInThisObj[key] >= 6){
				discount = Math.floor(lookForDiscountInThisObj[key] / 6); 
				totalPrice = totalPrice - (1.5 * discount);
				console.log('discount applied');
			}
		}
		console.log('$' + totalPrice, 'price after discount');
		// send the final calculated price in response to the frontend
		res.send(JSON.stringify(totalPrice));

	}
};