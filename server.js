const express = require('express');
const db = require('./src/config/config.db');

const sendEmail = require('./src/utils/sendEmail');
const app = express();
app.use(express.json());

const userRouter = require('./src/routes/authentication')
app.use('/users', userRouter);

app.post("/sendEmail",async  (req, res) => {
    try{
        const email = req.body.email;
        const subject = req.body.subject;
        const text = req.body.text;

        await sendEmail(email, subject, text);
        res.status(200).send("email sent successfully");
    } catch(e) {
        res.status(500).send(e);
        console.log(e)
    }
    
})

const authRouter = require('./src/routes/auth.router')
app.use('/api/auth', authRouter);



app.listen(8080, () => {
    console.log("Listening on port 8080")
})