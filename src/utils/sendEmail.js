const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (email, subject, text) => {
        const transporter = nodemailer.createTransport ({
            host: process.env.HOST,
            // service: process.env.SERVICE,
            port: 465,
            secure: true,
            auth : {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        })

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: text,
        }

        console.log(process.env.EMAIL);
        console.log(process.env.PASS);
        console.log(process.env.HOST);
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.error(err);
            } else {
                console. log(info);
            }
        })
    
}

module.exports = sendEmail;