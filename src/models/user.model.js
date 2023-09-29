const mongoose = require("mongoose");
const constants = require("../utils/constants");

const NewUserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
         type:String,
         default:constants.userType.CUSTOMER,
         enum:[constants.userType.CUSTOMER,constants.userType.ADMIN,constants.userType.ENGINEER]
    },
    userStatus:{
        type:String,
        default:constants.userStatus.APPROVED,
        enum:Object.keys(constants.userStatus)
    },
    createdAt:{
        type:Date,
        unique:true,
        default:()=>Date.now()
    }    
})

const UserModel = mongoose.model("userCollection",NewUserSchema);



module.exports= UserModel;
