const jwt = require('jsonwebtoken')


exports.jwtCookies = (req, res, next) => {
    

    try{
        const token = req.cookies.token;
        const userPayload = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = userPayload;
        next();
        
    }catch(error) {
        res.clearCookie('token');
        return res.redirect('/api/auth/login');
        // return res.json({success: "False", message: "You have to login first."})
    }
}

