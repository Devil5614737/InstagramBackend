const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const User=require('../model/user');

router.post('/',async(req,res)=>{
    const {fullname,username,email,password}=req.body
    const newUser=new User({
        fullname,username,email,password
    })
try{
    const existedUser=await User.findOne({email})
    if(existedUser){
        res.status(400).json('user already registered')
    }else{
        const salt=await bcrypt.genSalt(12);
        newUser.password=await bcrypt.hash(newUser.password,salt);
        const user=await newUser.save()
        res.status(200).json('user registered')
        console.log(user);
    }

}catch(e){
    console.log(e)
}
})








module.exports=router;