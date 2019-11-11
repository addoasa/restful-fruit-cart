// check that the amount of items on the ui match the amount in the json
// total should equal total in local storage
// array should be equal to whats in local storage
const inventoryJSON = require('../public/clientInventoryJSONData');
const { shoppingCartArr, finalAmountForTesting } = require("../public/script/index");
console.log(shoppingCartArr,"AYYYYEEE")
test("Initializing Jest", ()=>{
  expect(true).toBeTruthy();
});


describe("Testing Local Storage", ()=>{
  describe("Testing the use of local storage in the <header>",()=>{
    it("the final price total in the <header> should match the final price in local storage.", ()=>{
      
    })
    it("the shoppingCartArr in index.js should match the array at localStorage key 'shoppingCart'. ", ()=>{
      
    })
    it("the cartCount should match the length of the array at localStorage key 'shoppingCart.", ()=>{
      
    })
  })
  describe("Testing the use of local storage in the modal checkout.",()=>{
    it("the final price total in the modal checkout should match the final price in local storage.",()=>{
      
    })
    it("the list of checkout items should have the correct quantity of items",()=>{
      
    })
  })
})
