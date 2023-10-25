const express = require('express');
const Router = express.Router();

const passwordControllers = require('../controllers/password.controller');

Router.post('/recover', passwordControllers.recover);
Router.get('/reset/:token', passwordControllers.reset);
Router.post('/reset/:token', passwordControllers.resetPassword);

module.exports = Router;