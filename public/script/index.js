console.log(inventoryJSON);

const inventorySet = document.querySelector('.inventory-set');
inventorySet.classList.add('inventory-set');

for(let i = 0; i < inventoryJSON.length; i++){
  let inventoryItem = document.createElement("div");
  inventoryItem.id = inventoryJSON[i].id;
  inventoryItem.classList.add('inventory-item')
  let inventoryItemDesc = document.createElement("h3");
  inventoryItemDesc.classList.add("inventory-item-desc");
  inventoryItemDesc.innerText = inventoryJSON[i].description;
  let inventoryItemPrice = document.createElement("h4");
  inventoryItemPrice.classList.add("inventory-item-price");
  inventoryItemPrice.innerText = "$" + inventoryJSON[i].unit_price;
  // let inventoryItemDiscount = document.createElement("h4");
  let addToCartBtn = document.createElement('button');
  addToCartBtn.id = "button"+ inventoryJSON[i].id;
  addToCartBtn.innerText = "Add to Cart";
  // inventoryItemDiscount.innerText = "Save:" + " " + "Buy" + inventoryJSON[i].volume_discounts[0].number + " " + "for" + " " + inventoryJSON[i].volume_discounts[0].price;
  inventoryItem.appendChild(inventoryItemDesc);
  inventoryItem.appendChild(inventoryItemPrice);
  // inventoryItem.appendChild(inventoryItemDiscount);
  inventoryItem.appendChild(addToCartBtn);
  inventorySet.appendChild(inventoryItem);
}
