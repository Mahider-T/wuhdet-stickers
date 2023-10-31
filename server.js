const express = require('express');
const db = require('./src/config/config.db');
const sendEmail = require('./src/utils/sendEmail');

const cors = require('cors');
const path = require("path");

const app = express();

app.use(cors());

app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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

const passwordRouter = require('./src/routes/password.router');
app.use('/api/password', passwordRouter);

const agentRouter = require('./src/routes/agent.router');
app.use('/api/agent', agentRouter);

const orderRouter = require('./src/routes/order.router');
app.use('/api/orders', orderRouter);



app.listen(8080, () => {
    console.log("Listening on port 8080")
})