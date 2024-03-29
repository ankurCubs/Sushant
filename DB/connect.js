const mongoose = require('mongoose');

const MONGODB_URI =process.env.MONGODB_URI;

const connect = ()=>{
    console.log('DB connected');
    return mongoose.connect(MONGODB_URI);
}

module.exports = connect;