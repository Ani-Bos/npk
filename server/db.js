const mongoose=require("mongoose");


// const mongoURI="mongodb://localhost:27017/npk?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const mongoURI=`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.qkqwkdq.mongodb.net/npk?retryWrites=true&w=majority`
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successfully");
    })
}
module.exports={connectToMongo,mongoURI};