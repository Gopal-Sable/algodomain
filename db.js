const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://gops:SableG@cluster0.chiierp.mongodb.net/?retryWrites=true&w=majority"
// const mongoURI = "mongodb://localhost:27017/algodomain?readPreference=primary&appname=MongoDB%20Compass&ssl=false"


const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected");
    })
}

module.exports = connectToMongo;