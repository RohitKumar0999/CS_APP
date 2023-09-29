const { CreateNewUser, Login } = require("../Controllers/auth.controller.js");
const { ValidateSignUp, ValidateSignIn } = require("../middlewares/auth.middleware.js");

module.exports = (app)=> {

    app.post("/cs/api/v1/auth/signup",[ValidateSignUp],CreateNewUser);
    app.post("/cs/api/v1/auth/login",[ValidateSignIn],Login)
}