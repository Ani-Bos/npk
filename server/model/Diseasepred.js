const mongoose = require('mongoose');

const { Schema } = mongoose;

  const Disease = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    filename:{
        type:String,
        required:true
    },
    fileid:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    probability:{
        type:String,
        required:true
    },
   
   createdAt:{
       type:Date,
       default:Date.now
   }
  },{ timestamps: true});
  const Diseaseres=mongoose.model('diseasepred',Disease);
  
  module.exports=Diseaseres;