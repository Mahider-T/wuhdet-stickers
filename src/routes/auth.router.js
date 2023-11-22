const express = require('express')
const Router = express.Router();

const auth = require('../controllers/auth.controller')

Router.post('/register', auth.register);
Router.get('/register', auth.registerForm);
Router.get('/login', auth.loginForm);
Router.post('/login', auth.login);
Router.get('/verify/:token', auth.verify);
Router.get('/resendToken', auth.resendToken);

module.exports = Router;