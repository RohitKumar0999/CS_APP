const { verify } = require("jsonwebtoken")
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require("../Controllers/user.controller")
const { Verifyjwt, VerifyAdmin, VerifyAdminOrOther } = require("../middlewares/auth.middleware")

module.exports=function(app){
    app.get("/cs/api/v1/users",[Verifyjwt,VerifyAdmin],getAllUsers)
    app.get("/cs/api/v1/users/:id",[Verifyjwt,VerifyAdminOrOther],getUserById)
    app.put("/cs/api/v1/users/:id",[Verifyjwt,VerifyAdminOrOther],updateUserById) 
    app.delete("/cs/api/v1/users/:id",[Verifyjwt,VerifyAdminOrOther],deleteUserById)
}