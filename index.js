require('dotenv').config();
const express= require('express');
const app = express();
const connectDb= require('./DB/connect');


const adminAuth = require('./middlewares/adminAuth');
const customerAuth = require('./middlewares/customerAuth');

app.use(express.json());

const PORT = process.env.PORT || 5000;

const registerRoute = require('./routes/register');
app.use('/users/register',registerRoute);

const loginRoute = require('./routes/login');
app.use('/auth',loginRoute);


const categoriesRoute =require('./routes/category');
app.use('/categories',adminAuth,categoriesRoute);


const listProductRoute = require('./routes/product');
app.use('/products',listProductRoute);

const orderRoute=require('./routes/order');
app.use('/order',customerAuth,orderRoute);



const start = ()=>{
    app.listen(PORT,()=>{
        console.log(`server running at ${PORT}`);
        connectDb();
    })
}

start();