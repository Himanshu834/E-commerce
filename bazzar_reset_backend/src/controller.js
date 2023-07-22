const User=require('./model.js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
exports.resetPassword=(req,res)=>{
    const {resetLink,newPass}=req.body;
    if(resetLink){
        jwt.verify(resetLink,'RESET_PASSWORD',function(error,decodeData){
            if(error){
                return res.status(400).json({
                    error:"Incorrect token or it is expired."
                })
            }
            User.findOne({resetLink},async (error,user)=>{
                if(error || !user){
                    return res.status(400).json({error:'User with this token does not exist'});
                }
                const password=await bcrypt.hash(newPass,10);
                // return res.status(200).json({user});
                user.updateOne({resetLink:'',hash_password:password},(error,success)=>{
                    if(error){
                        return res.status(400).json({error:'reset password error'});
                    }
                    else{
                        return res.status(200).json({message:`Password Updated Successfully`});
                    }
                })
            })
            
        })
    }
    else return res.status(400).json({message:'Authentication Required'});
}