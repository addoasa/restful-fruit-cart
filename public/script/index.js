// inventoryJSON is the json array from clientInventoryJSON.js accessed through html script tag
// console.log(inventoryJSON);

//Store shoppingCart property in localstorage to this variable if it exists.  
let shoppingCartArr = localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : [];

/*-----------------
    Main Inventory
-------------------*/

const inventoryContainer = document.querySelector('.inventory-container');

//iterate through JSON 
for(let i = 0; i < inventoryJSON.length; i++){
	// create individual UI item for each inventory item
	let inventoryItem = document.createElement('div');
	inventoryItem.id = 'item' + '-' + inventoryJSON[i].id;
	inventoryItem.classList.add('inventory-item');
	inventoryItem.style.backgroundImage = `url(${inventoryJSON[i].image})`;

	// create individual item description
	let inventoryItemDesc = document.createElement('h3');
	inventoryItemDesc.classList.add('inventory-item-desc');
	inventoryItemDesc.innerText = inventoryJSON[i].description;

	// create individual item price
	let inventoryItemPrice = document.createElement('h4');
	inventoryItemPrice.classList.add('inventory-item-price');
	inventoryItemPrice.innerText = '$' + inventoryJSON[i].unit_price;

	// create individual add to cart button
	let addToCartBtn = document.createElement('button');
	addToCartBtn.id = inventoryJSON[i].id;
	addToCartBtn.classList.add('inventory-item-btn');
	addToCartBtn.classList.add(inventoryJSON[i].description);
	addToCartBtn.innerText = 'Add to Cart';
	addToCartBtn.addEventListener('click',addItem);
	
	
	// insert data into UI item
	inventoryItem.appendChild(inventoryItemDesc);
	inventoryItem.appendChild(inventoryItemPrice);
	inventoryItem.appendChild(addToCartBtn);

	// create discount if discount exists for the item
	if(inventoryJSON[i].volume_discounts.length){
		let discount = document.createElement('h4');
		discount.classList.add('inventory-item-discount');
		discount.innerText = `* Sale: ${inventoryJSON[i].volume_discounts[0].number} for $${inventoryJSON[i].volume_discounts[0].price} *`;
		inventoryItem.appendChild(discount);
	}

	// insert UI item into the DOM
	inventoryContainer.appendChild(inventoryItem);
}

// This function will be called when the add to cart button is clicked.
function addItem(event){
	// populate array with id of item user clicked and update localstorage
	shoppingCartArr.push(event.target.id);
	localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartArr));
	// update the shopping cart count
  cartCount.innerText = 'x' + JSON.parse(localStorage.getItem('shoppingCart')).length;
  // console.log(localStorage.getItem('shoppingCart'));
	// send local storage to backend for price calulations
	fetch('http://localhost:3000/addToCart', {
		method: 'post',
		headers:{
			'content-type' : 'application/json',
			'Accept' : 'application/json'
		},
		body : localStorage.getItem('shoppingCart'),
	})
		.then((result)=>{
			return result.text();
		})
		.then((data)=>{
			total.innerText = '$' + JSON.parse(data).toFixed(2);
			localStorage.setItem('finalPrice', data);
		});
	// store the final price (including discount) in localstorage

	// notify the user that their item has been added
	notifyUser(event.target.classList[1]);
}

/*-----------------
      Header
-------------------*/

const cartStatus = document.querySelector('.shopping-cart-status');

// create a counter of the amount of items in local storage shopping cart
const cartCount = document.createElement('h3');
cartCount.innerText = 'x' + (localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')).length : 0) ;
cartCount.id = 'cart-count';
cartStatus.appendChild(cartCount);

// update total with final price in localstorage
const total = document.querySelector('.total');
total.innerText = localStorage.getItem('finalPrice') ? ('$' + JSON.parse(localStorage.getItem('finalPrice')).toFixed(2)) : ('$' + 0);


const clearCart = document.querySelector('#clear-cart-btn');
const checkout = document.querySelector('#checkout-btn');
checkout.addEventListener('click',()=>{
	// on click show modal and calulate/update total
	const modal = document.querySelector('#modal-container');
	modal.style.display = 'block';
	updateCheckoutList();
	
});
clearCart.addEventListener('click',()=>{
	/* onclick empty shopping cart in localstorage, empty shoppingCartArr 
  variable, and update final price to 0 via route */
	localStorage.removeItem('shoppingCart');
	shoppingCartArr = [];
	cartCount.innerText = 'x' + 0;
	// console.log(localStorage.getItem('shoppingCart'));
	fetch('http://localhost:3000/clearCart', {
		method: 'get',
		headers:{
			'content-type' : 'application/json',
			'Accept' : 'application/json'
		}
	})
		.then((result)=>{
			return result.text();
		})
		.then((data)=>{
			total.innerText = '$' + data;
			localStorage.setItem('finalPrice', data);
		});
});

/*-----------------
      Modal
-------------------*/

const modal = document.querySelector('#modal-container');
const checkoutList = document.querySelector('.checkout-list');

const checkoutTotal = document.createElement('h3');
checkoutTotal.innerText = 'Total :' + (localStorage.getItem('finalPrice') ? ('$' + JSON.parse(localStorage.getItem('finalPrice')).toFixed(2)) : ('$' + 0));
modal.appendChild(checkoutTotal);

// close modal
const modalExit = document.querySelector('.modal-exit');
modalExit.addEventListener('click',()=>{
	modal.style.display = 'none';
});

/* The function below (updateCheckoutKist) will be called anytime the checkout button is clicked.
   It is used in the checkout button's eventlistener. */

function updateCheckoutList(){
	const shoppingCartObj ={};
	// remove the checkout list in preparation for update
	while (checkoutList.firstChild) {
		checkoutList.removeChild(checkoutList.firstChild);
	}
	// iterate through localstorage inventory arr & populate object with {item:count} properties
	if(shoppingCartArr){
		for(let i = 0; i< shoppingCartArr.length; i++){
			if(shoppingCartObj.hasOwnProperty(shoppingCartArr[i])){
				shoppingCartObj[shoppingCartArr[i]]++;
			}else{
				shoppingCartObj[shoppingCartArr[i]] = 1;
			}
		}
		// create new updated list of items from populated object
		for(let key in shoppingCartObj){
			const newListItem = document.createElement('li');
			newListItem.innerText = `${key} x ${shoppingCartObj[key]}`;
			checkoutList.appendChild(newListItem);
		}
	}
	// Update the final checkout total
	checkoutTotal.innerText = 'Total :' + (localStorage.getItem('finalPrice') ? ('$' + JSON.parse(localStorage.getItem('finalPrice'))) : ('$' + 0));
}

/*-----------------
    Notification
-------------------*/
{/* <img id="cart-status-icon" src="./assets/shopping-cart.png"> */}
// notify the user that their item was added whenever they click add to cart
function notifyUser(item){	
	let footer = document.querySelector('footer');
	// create UI item whenever user adds an item to shopping cart
	let notificationContainer = document.createElement('div');
	notificationContainer.classList.add("notification-container");
	let notificationIcon = document.createElement('img');
	notificationIcon.src = "./assets/shopping-cart.png";
	notificationIcon.id = "notification-icon";
	let notificationMessage = document.createElement('h4');
	notificationMessage.classList.add("notification-message");
	
	// insert the product that was added to the cart into the notification message
	notificationMessage.innerText = `${item} added to shopping cart`;

	// append ui component into the dom
	notificationContainer.appendChild(notificationIcon);
	notificationContainer.appendChild(notificationMessage);
	footer.appendChild(notificationContainer);

	// Give the notification 3 seconds before it disappears
	setTimeout(()=>{
		notificationContainer.remove();
	},2000);


}