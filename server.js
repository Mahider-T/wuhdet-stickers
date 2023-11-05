const express = require('express');
const db = require('./src/config/config.db');
const sendEmail = require('./src/utils/sendEmail');

const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const uploadMany = require('./src/utils/uploadMany');
const multer = require('multer');

const upload = multer().array('sticker', 2);

const app = express();

app.use(cookieParser());

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const userRouter = require('./src/routes/authentication')
app.use('/users', userRouter);

// app.post("/sendEmail",async  (req, res) => {
//     try{
//         const email = req.body.email;
//         const subject = req.body.subject;
//         const text = req.body.text;

//         await sendEmail(email, subject, text);
//         res.status(200).send("email sent successfully");
//     } catch(e) {
//         res.status(500).send(e);
//         console.log(e)
//     }
    
// })

// app.post('/uploadMany', upload, async (req, res) => {
//     try{
//         // console.log(req.files)
//         uploadMany(req).then((data) => {
//             console.log(data);
//         }).catch((error) => {
//             console.log(error);
//         });
//         return res.send("images uploaded successfully")
//     }catch (error) {
//         console.log(error);
//         res.send(`Error is ${error}`);
//     }
// })

app.post('/uploadMany', upload, async (req, res) => {
    try {
      uploadMany(req)
        .then(data => {
        let theType = typeof data; 
        //   console.log(data);
          return res.json({data: data});
        })
        .catch(error => {
          console.log(error);
          res.status(500).send(`Error: ${error}`);
        });
    } catch (error) {
      console.log(error);
      res.status(500).send(`Error: ${error}`);
    }
  });

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