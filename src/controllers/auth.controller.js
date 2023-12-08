const User = require('../models/user');
const Token = require('../models/token')
const sendEmail = require('../utils/sendEmail');
const user = require('../models/user');
const { errorMonitor } = require('nodemailer/lib/xoauth2');

const cookieParser = require('cookie-parser')

// @api/auth/register
// @desc register user
// @access public
const register = async (req, res) => {
    try{
        const {email} = req.body;
        const userFound = await User.findOne({email});
        if (userFound) {
            return res.status(401).json({message: 'This email is already associated to an account.', })
        }
        const newUser = new User({...req.body, role: "basic"})

        const persistedUser = await newUser.save();
        sendVerificationEmail(persistedUser, req, res);
    } catch(err) {
        res.status(500).json({success: false, message: err.message})
    }
    
}

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
    
        await User.findOne({email: email}).then((user) => {
            if(!user) {
                return res.status(401).json({message: `Account with email '${email}' not found.`});
            }
            const authenticate = user.comparePassword(password);
            if(!authenticate) {
                return res.status(401).json({message: "Either email or password is incorrect"})
            }
            
            if(!user.isVerified) {
                return res.status(401).json({message: "User is not verified."})
            }

            const token = user.generateJWT();

            res.cookie("token", token, {
                httpOnly: true,
                // secure: true,
                // maxAge: 1000000,
                // signed: true

            });
            return res.redirect('/api/stickers/')
        }).catch((error) => {
            res.status(500).json({message: error.message});
        }) 
       
    }catch(error) {
        res.status(500).json({message : error.message})
    }   
    
}

// Register page render

const registerForm = async (req, res) => {
    res.render('register')
}
//Login page render
const loginForm = async (req, res) =>{
    res.render('login');
}


// ===EMAIL VERIFICATION
// @route GET api/verify/:token
// @desc Verify token
// @access Public


const verify = async (req, res) => {
    await Token.findOne({token: req.params.token}).
        then(async (token) => {
            if (!token) res.status(401).json({message: "Unable to find the token"});

            // if the token is found, then look for the corresponding user.
            
            await User.findOne({_id: token.userId}).then(async (user) => {
                // console.log(await user.findOne({id: token.userId}))
                if (!user) res.status(400).json({message: "Unable to find a user with the given token"});
                if (user.isVerified) res.status(400).json({message: "User is already verified, you can login."})

                user.isVerified = true;
                await user.save();
                await user.save().then((user) => {res.status(200).json({message: "User verified successfully"})})
                .catch((error) => {res.status(500).json({message: error.message})});
            }).catch((error) => res.status(500).json({message : error.message}));
        }).catch((error) => res.status(500).json({message: error.message}));
      
}

// @route POST api/resend
// @desc Resend Verification Token
// @access Public
const resendToken = async (req, res) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email: email});
        if(!user) res.status(401).json({message: `No account matches the email ${email}`});

        if(user.isVerified) {
            return res.status(400).json({message: "The account has already been verified"});

        }
        await sendVerificationEmail(user, req, res);
        // res.status(200).json({message: "Verification email sent successfully"})
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}


async function sendVerificationEmail(user, req, res){
    try{
        const token = user.generateVerificationToken();

        // Save the verification token
        await token.save();

        let subject = "Account Verification Token";
        let to = user.email;
        // let from = process.env.FROM_EMAIL;
        let link="http://"+req.headers.host+"/api/auth/verify/"+token.token;
        let html = `<p>Hi ${user.username}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`;

        console.log(html);
        await sendEmail(to, subject, html);

        res.status(200).json({message: 'A verification email has been sent to ' + user.email + '.'});
    }catch (error) {
        res.json({message: error.message})
    }
}

module.exports = {register, login, verify, resendToken, registerForm, loginForm};