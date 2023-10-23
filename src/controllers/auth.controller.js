const User = require('../models/user');
const sendEmail = require('../utils/sendEmail');

// @api/auth/register
// @desc register user
// @access public
const register = async (req, res) => {
    try{
        const {email} = req.body;
        const userFound = await User.findOne({email});
        if (userFound) {
            res.status(401).json({message: 'This email is already associated to an account.', })
        }
        const newUser = new User({...req.body, role: "basic"})

        const persistedUser = await newUser.save();
        sendVerificationEmail(persistedUser, req, res);
    } catch(err) {
        res.status(500).json({success: false, message: err.message})
    }
    
}

const login = async (req, res) => {
    try{
        const {email} = req.body;
        console.log(email);
    
        const user = await User.findOne({email: email});
        if(!user) {
            res.status(401).json({message: `Account with email ${email} not found.`});
        }
        const authenticate = user.comparePassword(req.body.password);
        if(!authenticate) {
            res.status(401).json({message: "Either email or password is incorrect"})
        }
        
        if(!user.isVerified) {
            res.status(401).json({message: "User is not verified."})
        }
        res.status(200).json({message:"User authenticated successfully"})
 
    }catch(error) {
        res.status(500).json({message : "Something went wrong."})
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

module.exports = {register, login};