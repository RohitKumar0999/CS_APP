const authConfig = require("../config/auth.config")
const UserModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const { userStatus,userType } = require("../utils/constants")



const ValidateSignUp = async (req,res,next)=>{
    if(!req.body.name){
        res.status(400).send("!Invalid name is not present.")
       }
       
       if(!req.body.userId){
        res.status(400).send("!userId name is not present.")
        }
       
       if(!req.body.password){
        res.status(400).send("!Invalid password is not present.")
        
       }
       
       if(!req.body.email){
        res.status(400).send("!Invalid email is not present.")

    }

    // Validiating the Gmail Id
    const ValidateGmailAndUserId = await UserModel.find({$or:[{email:req.body.email},{userId:req.body.userId}]})
    if(ValidateGmailAndUserId && ValidateGmailAndUserId.length)
    res.status(400).send({message:"User Already Exists"});
    // .then(data=>{
    //    if(data != null)
    //    res.status(400).send("Gmail Id Already exists!")
    // })
    next();   
}

const ValidateSignIn = (req,res,next)=>{
    if(!req.body.userId){
        res.status(400).send("!userId name is not present.")
        
       }
       
       if(!req.body.password){
        res.status(400).send("!Invalid password is not present.")
        
       }   
next();
    }

const Verifyjwt =( req,res,next)=>{
    console.log(req.body)
    const token = req.headers['access-token'];
    if(!token){
        res.status(404).send({message:"Token is not passed"});
    }
    jwt.verify(token,authConfig.SECRET,async(err,payload)=>{
        if(err){
            res.status(403).send({message:"Invalid jwt token passed"})
        }
        const userId = payload.id;
        req.userId= userId;
        try{
            const user = await UserModel.findOne({userId:userId})
           req.id = user._id,
           req.userType = user.userType

       }
       catch(err){
        res.status(500).send({message:err || "Invalid Sever Error"})
       }
        
        next();
    })
    
}



const VerifyAdmin = (req,res,next)=>{
    const userId= req.userId;
    const user=UserModel.findOne({userId:userId})

    if(user && user.userType === constants.ADMIN)
     next();
    else
    res.status(403).send({message:"You are not Authorized to access to this data"})

}

const VerifyAdminOrOther = (req,res,next)=>{
const userRole= req.userType;
const loggedInUserId = req.userId;
const UserIdAsked = req.params.id;


if((userRole === userType.ADMIN ) || (loggedInUserId === UserIdAsked )){

    next();
    return;
}

    res.status(403).send({message:"Your are Not Allowed access these details"});
}






module.exports={
    ValidateSignUp,ValidateSignIn,Verifyjwt,VerifyAdmin,VerifyAdminOrOther
}