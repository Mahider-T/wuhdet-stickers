const jwt = require('jsonwebtoken')


exports.jwtCookies = (req, res, next) => {
    // const token2 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzdjNTZiOTdkMTk0ODI5MTFmZDc0ZCIsImVtYWlsIjoibWFoZGVydGVrb2xhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoib29nd2F5cnVsZXMiLCJmaXJzdE5hbWUiOiJNYWhpZGVyIiwibGFzdE5hbWUiOiJPb2d3YXkiLCJpYXQiOjE2OTg4MjE2NDAsImV4cCI6MzQwMjgyNzI4MH0.NwLcRedqZiljkFnMbeaLIPmoyx0KfBONQ4DzWpojHDk`;

    try{
        const token = req.cookies.token;
        console.log(token);
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

