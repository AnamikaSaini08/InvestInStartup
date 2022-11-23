const mongoose = require('mongoose');
//connect DB
const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/xharktank");
        console.log("connected to mongoDB");
    }catch(err){
        throw err;
    }
};

module.exports = connectDB;
