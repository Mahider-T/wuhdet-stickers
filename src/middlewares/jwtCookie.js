const jwt = require('jsonwebtoken')


exports.jwtCookies = (req, res, next) => {
    

    try{
        const token = req.cookies.token;
        // console.log(token);
        const userPayload = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(userPayload);
        // userId = userPayload.id;
        req.user = userPayload;
        
        next();
// 
    }catch(error) {
        res.clearCookie('token');
        return res.redirect('/api/auth/login');
    }
}

