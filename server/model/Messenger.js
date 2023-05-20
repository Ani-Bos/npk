// const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

  const MessageSchema = new Schema({   

   room:{
    type:String,
   required:true
   },

   chat:{
    type:Array,
    required:true
   }
   
  },{ timestamps: true});
  const Message=mongoose.model('chat',MessageSchema);
  
  module.exports=Message;
