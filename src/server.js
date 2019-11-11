const app = require('./app');
const PORT = 3000;
// Server separated from app to prevent Supertest & Jest from spinning server up
// Server running
app.listen(PORT,()=>{
	console.log(`Application running on localhost ${PORT}`);
});