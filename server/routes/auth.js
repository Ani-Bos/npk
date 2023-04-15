
const express =require('express');
const router=express.Router();
// const User=require('../models/User')
// const fillter=require('../middleware/filter')
// const bcrypt= require('bcryptjs')
const User =require('../model/Auth')
const jwt = require('jsonwebtoken');
const fillter =require('../middleware/fillter')

const JWT_SECRET="Hostel4>v7A"

router.post('/createUser',async(req,res)=>{
try{
let user= await User.findOne({phone:req.body.phone});
if(user){
  return res.json({status:"user with this email already exists",mark:true}) 
}
// const salt=await bcrypt.genSalt(10);
// const secPass=await bcrypt.hash(req.body.password,salt);

   user= await User.create({
        name: req.body.name,
        phone: req.body.phone,
        
      })
  const data={
   id:user.id
  }
  const authToken = jwt.sign(data, JWT_SECRET);
  res.json({status:"User added to database",authToken:authToken})
  
    }catch (error){
      console.error(error.message);
      res.status(500).send("Internal Server Error") 
    }
  })
  router.post('/login',async(req,res)=>{
  
 const {phone}=req.body;
 try {
   let user=await User.findOne({phone:phone});
   if(!user){
    return res.status(400).json({status:"please try to login with corrrect credentials"});

   }
   
   const data={
   id:user.id
  }
  const authToken = jwt.sign(data, JWT_SECRET);
  res.json({status:"User loggedin",authToken:authToken})
  
 } catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error Occured")
   
 }

  })
 
    router.post('/getuser',fillter,async(req,res)=>{
    try {
     const userId=  req.user.id;
      const user= await User.findById(userId)
      if(!user){
        return res.json({status:"User not found"})
      }
      res.json({user})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured")
    }
  })

router.delete("/deleteuser", fillter, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send("Unauthorized");
    }
    user = await User.findByIdAndDelete(req.user.id);
    res.json({ success: "Your account has been deleted",deleteduser:user});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

router.put('/updateuser',fillter,async(req,res)=>{
    const {name,phone,address}=req.body;
    try {
        let user = await User.findById(req.user.id);
       
        if (!user) {
          return res.status(404).json({status:"Unauthorized"});
        }
        const updateduser=await User.findByIdAndUpdate(req.user.id,{name:name?name:user.name, phone:phone?phone:user.phone},{new:true});
        res.json({status:"User info Updated",updatedinfo:updateduser})
    } catch (error) {
        console.error(error);
    res.status(500).send("Internal Server Error Occured");
    }
})
module.exports = router