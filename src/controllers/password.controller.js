const user = require('../models/user');
const User = require('../models/user');
const sendEmail = require('../utils/sendEmail');

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public

const recover = async (req, res) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email: email});
        
        if(!user) res.status(400).json({message: `No account corresponds to the email ${email}`});

        user.generatePasswordReset();
        await user.save();

        let subject = "Change password request";
        let to = user.email;
        let link = "http://" + req.headers.host + "/api/password/reset/" + user.resetPasswordToken;
        let text = `<p>Hi ${user.username}</p>
        <p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

        await sendEmail(to, subject, text);
        res.status(200).json({message: `Email to reset password has been sent to ${to}`});
    }catch(error) {
        res.status(500).json({message: error.message});
    }
}

// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public

const reset = async (req, res) => {
    try {
        const {token} = req.params;

        const user = await User.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});
        if(!user) return res.status(401).json({message: "Invalid or expires password reset token"});
        res.render('reset', {user});
    }catch(error) {
        res.status(500).json({message: error.message});
    }
}

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
const resetPassword = async (req, res) => {

    try{
        const {token} = req.params;
        const user = await User.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});
        //I don't think checking if the user exists is necessary since it is done in GET api/auth/reset
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.isVerified = true;

        await user.save();
        let subject = "Password changed successfully"
        let to = user.email;
        let text = `<h3>Hello ${user.username}</h3><br>
                    <p> This is a confirmation that your password has been successfully changed.`;
        
        await sendEmail(to, subject, text);
        res.status(200).json({message: "Your password has been updated."})
    } catch(error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
    
}




module.exports = {recover, reset, resetPassword}
