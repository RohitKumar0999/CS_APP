// const { raw } = require("body-parser");
const authConfig = require("../config/auth.config.js");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { userType,userStatus} = require("../utils/constants.js");
const { sendMail } = require("../utils/NotificationUtils.js");
const { text } = require("body-parser");
const { userLogin } = require("../templates/email/auth.scripts.js");

const CreateNewUser = async (req,res)=>{
console.log("Creating the user");
   const Usertype = req.body.userType;
   const status = (Usertype===userType.CUSTOMER?userStatus.APPROVED:userStatus.PENDING);
    const NewUser = new UserModel({
        name:req.body.name,
        userId:req.body.userId,
        email:req.body.email,
       password:bcrypt.hashSync(req.body.password,10),
       userType:req.body.userType,
       userStatus:status
    });
    await NewUser.save()
    .then(data=>res.send(data))
    .catch(err=>res.send({message:err.message}))
    res.send("SingnUp Successfull");
}



const Login = async (req,res)=>{
    console.log(req.body);
    const User= await UserModel.findOne({userId:req.body.userId})
    console.log(User);
    console.log(req.body.userId);

           if(User===null){
               res.status(400).send({message:"UserId passed is !Invalid"})
              console.log("UserId passed is Invalid");
           }

        const IsValidPassword= bcrypt.compareSync(req.body.password,User.password)
        if(!IsValidPassword){
            res.status(400).send({message:"Password passed is !Invalid"})
        }
        
        var token = jwt.sign({id:User.userId},authConfig.SECRET,{expiresIn:600});



        const {subject,text,html} = userLogin(User);

        console.log(subject)
        console.log(text)
        console.log(html)

          sendMail([User.email],subject,text,html);
        res.send({
            name:User.name,
            userId:User.userId,
            email:User.email,
            accessToken:token,
            userType:User.userType
        });
       


}

module.exports={
   CreateNewUser,Login
}