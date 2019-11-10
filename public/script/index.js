console.log(inventoryJSON);
let shoppingCartArr = localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : [];

const header = document.querySelector('.shop-header');
const cartStatus = document.querySelector('.shopping-cart-status');
const cartCount = document.createElement('h3');
cartCount.innerText = 'x' + (localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')).length : 0) ;
cartCount.id = 'cart-count';
cartStatus.appendChild(cartCount);

const total = document.querySelector('#total');
total.innerText = localStorage.getItem('finalPrice') ? ('$' + JSON.parse(localStorage.getItem('finalPrice'))) : ('$' + 0);
const clearCart = document.querySelector('#clear-cart-btn');
const checkout = document.querySelector('#checkout-btn');
checkout.addEventListener('click',()=>{
	const modal = document.querySelector('#modal-container');
  modal.style.display = 'block';
});

clearCart.addEventListener('click',()=>{
	localStorage.removeItem('shoppingCart');
	shoppingCartArr = [];
	cartCount.innerText = 'x' + 0;
	console.log(localStorage.getItem('shoppingCart'));
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
const inventorySet = document.querySelector('.inventory-set');

for(let i = 0; i < inventoryJSON.length; i++){
	let inventoryItem = document.createElement('div');
	inventoryItem.id = 'item' + '-' + inventoryJSON[i].id;
  inventoryItem.classList.add('inventory-item');
  inventoryItem.style.backgroundImage = `url(${inventoryJSON[i].image})`;
  

	let inventoryItemDesc = document.createElement('h3');
	inventoryItemDesc.classList.add('inventory-item-desc');
	inventoryItemDesc.innerText = inventoryJSON[i].description;
	let inventoryItemPrice = document.createElement('h4');
	inventoryItemPrice.classList.add('inventory-item-price');
	inventoryItemPrice.innerText = '$' + inventoryJSON[i].unit_price;
	// let inventoryItemDiscount = document.createElement("h4");
	let addToCartBtn = document.createElement('button');
	addToCartBtn.id = inventoryJSON[i].id;
	addToCartBtn.innerText = 'Add to Cart';
	addToCartBtn.addEventListener('click',addItem);
	// inventoryItemDiscount.innerText = "Save:" + " " + "Buy" + inventoryJSON[i].volume_discounts[0].number + " " + "for" + " " + inventoryJSON[i].volume_discounts[0].price;
	inventoryItem.appendChild(inventoryItemDesc);
	inventoryItem.appendChild(inventoryItemPrice);
	// inventoryItem.appendChild(inventoryItemDiscount);
	inventoryItem.appendChild(addToCartBtn);
	inventorySet.appendChild(inventoryItem);
}

function addItem(event){
	shoppingCartArr.push(event.target.id);
	localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartArr));
	console.log(localStorage.getItem('shoppingCart'));
	cartCount.innerText = 'x' + JSON.parse(localStorage.getItem('shoppingCart')).length;
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
			total.innerText = '$' + data;
			localStorage.setItem('finalPrice', data);
		});
  
}

