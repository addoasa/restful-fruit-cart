//---------------------------------------------------------
//                       Checkout Page
//---------------------------------------------------------

const summary = document.querySelector('#summary');
let totalPrice = document.createElement('h1');
let getPrice = document.createElement('button');
getPrice.addEventListener('click', ()=>{
	fetch('http://localhost:3000/getQuoteAndApplyDiscounts', {
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
			totalPrice.innerText = data;
		});
});
getPrice.innerText = 'GET';

summary.appendChild(totalPrice);
summary.appendChild(getPrice);