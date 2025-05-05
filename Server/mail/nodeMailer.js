const nodemailer = require('nodemailer');

const sendMail=(subject,info)=>{

        let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'tamilarmartialarts993@gmail.com',
            pass: 'stdo ffuf zluo nrvs' 
        },
        });

        let mailOptions = {
        from: '"Tamilar Martial Arts" <tamilarmartialarts993@gmail.com>',
        to: 'tamilarmarabukalaiyagam@gamil.com',
        subject,
        text: info
        };

        transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
        });
}
module.exports=sendMail;