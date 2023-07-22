const express=require('express');
const router=express.Router();
const {resetPassword} = require('./controller.js')
router.put('/reset-password',resetPassword);
router.get('/',(req,res)=>{
    return res.status(200).json("hello");
});

module.exports=router;