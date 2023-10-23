const express = require('express')
const Router = express.Router();

const auth = require('../controllers/auth.controller')

// Router.use('/auth');
Router.post('/auth/register', auth.register);
Router.get('/auth/login', auth.login);

module.exports = Router;