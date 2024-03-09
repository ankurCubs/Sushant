require('dotenv').config();
const express= require('express');
const app = express();
const connectDb= require('./DB/connect');

app.use(express.json());

const PORT = process.env.PORT || 5000;

const UserModel = require('./models/User');
const CounterModel = requir
app.get('/user/register',(req,res)=>{


})


const start = ()=>{
    app.listen(PORT,()=>{
        console.log(`server running at ${PORT}`);
        connectDb();
    })
}

start();