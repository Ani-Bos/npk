const router=require('express').Router();
const Message=require('../model/Messenger')

router.post('/addchat',async(req,res)=>{
const {room,message}=req.body;
try {
    console.log(req.body)
    const chat= await Message.findOne({room:room});
    if(!chat)
    {
        let ch=[];
        ch.push(message)
     const newchat=   await Message.create({
            room:room,
            chat:ch
        })
        return res.json({chat:newchat})
    }
    // const getchat=await Message.findOne({room:room});
    // let newchat=getchat.chat;
    // newchat.push(message);
    // const updatedchat= await Message.findOneAndUpdate({room:room},{chat:newchat},{new:true});
    // return res.json({updatedchat:updatedchat})
    return res.json({chatc:chat})

    
} catch (error) {
    console.log(error)
    res.status(500).send("internal server error");
}
})
router.put('/updatechat',async(req,res)=>{
    const {room,message}=req.body;
    try {
         const getchat=await Message.findOne({room:room});
    let newchat=getchat.chat;
    newchat.push(message);
    console.log(newchat)
    const updatedchat= await Message.findOneAndUpdate({room:room},{chat:newchat},{new:true});
    return res.json({chat:updatedchat})
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error");
    }
})
router.get('/getallchat/:room',async(req,res)=>{
    const {room}=req.params;
    try {
        const allchat= await Message.findOne({room:room});
        res.json({allchat})
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports=router