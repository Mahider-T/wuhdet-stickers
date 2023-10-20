const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (email, subject, text) => {
    try{
        // const transporter = nodemailer.createTransport ({
        //     host: process.env.HOST,
        //     // service: process.env.SERVICE,
        //     port: 587,
        //     secure: false,
        //     auth : {
        //         user: process.env.AUTH,
        //         pass: process.env.PASS,
        //     },
        // })
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD,
              clientId: process.env.OAUTH_CLIENTID,
              clientSecret: process.env.OAUTH_CLIENT_SECRET,
              refreshToken: process.env.OAUTH_REFRESH_TOKEN
            }
          });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: text,
        }

        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.log(err);
        throw err;
    }
        
    
}

module.exports = sendEmail;