const nodemailer = require("nodemailer");


const sendMail =async function(emailIds,subject,text,html){

    let emailString = "";

    emailIds.forEach((email,i) => {
        if(i!=0){
            emailString+=",";
        }
        emailString+=email;
    });
    console.log(emailString);
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
        user:"thakralraman786@gmail.com",
        pass:"npli zgpk hywv zham",
    }
});


        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: "thakralraman786@gmail.com", // sender address
          to: emailString, // list of receivers
          subject, // Subject line
          text, // plain text body
          html, // html body
        });

    
}

module.exports={
    sendMail
}