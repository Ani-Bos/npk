// const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

  const UserSchema = new Schema({
      
   name:{type:String,
   required:true
   },
   
   phone:{
    type:Number,
    default:0
   },
   
   createdAt:{
       type:Date,
       default:Date.now
   }
  },{ timestamps: true});
  const User=mongoose.model('user',UserSchema);
  
  module.exports=User;
