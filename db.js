const mongoose = require("mongoose");

const connectToMongo = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/dashboarddb").then(()=>{
        console.log("connection successful");
        
    })
}

module.exports = connectToMongo;