const UserModel = require("../models/user.model")
// const moongose = require("moongose");



const getAllUsers = async(req,res)=>{
    try{
        const users = await UserModel.find({})
        res.status(200).send(users)
    }
    catch(e){
        res.status(500).send({message:e.message||"Internal Server Error"})
    }
}       

const getUserById = async(req,res)=>{
    try{
        const user= await UserModel.findOne({userId:req.params.id})
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send({message:e.message||"Internal Server Error"})
    }
}    

const updateUserById = async(req,res)=>{
   try{
     const user = await UserModel.findOneAndUpdate({userId:req.params.id},req.body,{new:true})
        res.status(200).send(user)
   }
   catch(err){
    res.status(500).send({message:e.message||"Internal Server Error"})
   }
       
        
       
    
       
}    

const deleteUserById = async(req,res)=>{
    try{
        const users = await UserModel.deleteOne({userId:req.params.id})
        res.status(200).send(users)
    }
    catch(e){
        res.status(500).send({message:e.message||"Internal Server Error"})
    }
}    

module.exports = {
    getAllUsers,getUserById,updateUserById,deleteUserById
}