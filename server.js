const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

require("./src/config/config.db");

const app = express();

app.use(cookieParser());

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const userRouter = require('./src/routes/authentication')
app.use('/users', userRouter);

const authRouter = require('./src/routes/auth.router')
app.use('/api/auth', authRouter);

const passwordRouter = require('./src/routes/password.router');
app.use('/api/password', passwordRouter);

const agentRouter = require('./src/routes/agent.router');
app.use('/api/agent', agentRouter);

const stickerRouter = require('./src/routes/stickers.router');
app.use('/api/stickers', stickerRouter);

const orderRouter = require('./src/routes/order.router');
app.use('/api/orders', orderRouter);

const PORT = process.env.PORT || 8080;

app.listen(8080, () => {
    console.log("Listening on http://127.0.0.1:8080/api/stickers");
})