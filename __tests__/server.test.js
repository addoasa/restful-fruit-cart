// test the discounts
const request = require('supertest');
const app = require('../src/server');
const shoppingController = require('../src/controllers/shopping-controller');

//test clearcart

//test addtocart
describe("Testing Server", ()=>{
  describe("Testing file serving",()=>{
    it("requesting '/' route should respond with a status of 200",(done)=>{
      request(app).get('/').then((res)=>{
        expect(res.statusCode).toBe(200)
        done();
      })
    })
  })
  describe("Testing middleware",()=>{
    describe("addToCart",()=>{
      it("POST to '/addToCart' with a body should respond with a status of 200", (done)=>{
        const fakeShoppingCart = ['A','B','C','D','A','B','A','A']
        request(app)
        .post('/addToCart')
        .send(fakeShoppingCart)
        .expect(200, done)
      })
    })
    describe("clearCart",()=>{
      it("The shopping cart data on the server should be emptied upon requesting the clearCart route.", (done)=>{
        request(app)
        .get('/clearCart')
        .expect(200, done);
      })
    })
    describe("are discounts correctly applied?",()=>{
      it("A cart with items “ABCDABAA” yields a total of $32.40.", ()=>{
        // A cart with items “ABCDABAA” yields a total of $32.40.
        const fakeShoppingCart = ['A','B','C','D','A','B','A','A'];
        return request(app)
        .post("/addToCart")
        .send(fakeShoppingCart)
        .expect(200, /32.4/)
      })

      it("A cart with items “CCCCCCC” yields a total of $7.25.",()=>{
        const fakeShoppingCart = ['C','C','C','C','C','C','C'];
        return request(app)
        .post("/addToCart")
        .send(fakeShoppingCart)
        .expect(200, /7.25/)
      })

      it("A cart with items “ABCD” yields a total of $15.40.",()=>{
        const fakeShoppingCart = ['A','B','C','D'];
        return request(app)
        .post("/addToCart")
        .send(fakeShoppingCart)
        .expect(200, /15.4/)
      })
    })
  })
})