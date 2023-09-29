const userLogin = (user)=>{
return{
    subject:"Logged in to CS App",
    html:`<div>
    <h3>Hello ${user.name},</h3>
    <br/>
    <br/>
    You are Successfully login to CS app with user ID as ${user.userId} and role ${user.userType} 
    </br>
    Thanks & Regards
    CS Backend Team
   </br>
   </br>
   <img height="100" width="100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7vmiUgFbbLpKTfMCZrJK6Wm-Lef6MrPFVrL0hR0PttuMWmau8vYU20eTtvQDgPno5zwg&usqp=CAU" />
    
   </div>`,
   text:null
}
}
module.exports={
    userLogin
}