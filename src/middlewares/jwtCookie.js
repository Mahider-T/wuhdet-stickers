const jwt = require('jsonwebtoken')


exports.jwtCookies = (req, res, next) => {
    const token = req.cookie.token;

    try{
        const userPayload = jwt.verify(token, process.env.JWT_SECRET);
        // userId = userPayload.id;
        req.user = userPayload;
        // console.log(userPayload);
        next();

    }catch(error) {
        res.clearCookie('token');
        return res.redirect('/api/auth/login');
    }
}

