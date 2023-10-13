const express = require('express');
const db = require('./src/config/config.db');
const app = express();

const userRouter = require('./src/routes/authentication')
app.use('/users', userRouter);


app.listen(8080, () => {
    console.log("Listening on port 8080")
})