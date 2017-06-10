const nodeMailer = require('nodemailer');

module.exports = (user,userMode) => {
   let transporter = nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user:'flylivingcn@gmail.com',
            pass:'cozuchou.'
        }
    });

    let mailOptions = {
        from:'flylivingcn@gmail.com',
        to:`${user.email}`,
        subject:'账号激活',
        // text:'hello world!',
        html:`<b><a href="http://localhost:3000/account/${userMode}/${user.token}">点此链接激活</a></b>`
    };
    
    transporter.sendMail(mailOptions,(error,info) => {
        if(error){
            return console.log(error);
        }
        console.log(info);
    });
}