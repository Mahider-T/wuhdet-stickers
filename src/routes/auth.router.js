const express = require('express')
const Router = express.Router();

const auth = require('../controllers/auth.controller')

Router.post('/register', auth.register);
Router.get('/login', auth.login);
Router.get('/verify/:token', auth.verify)

module.exports = Router;