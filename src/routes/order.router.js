const express = require("express");
const { addToCart } = require('../controllers/order.controller');
const Router = express.Router();
const { jwtCookies } = require('../middlewares/jwtCookie');


Router.post('/:stickerId', jwtCookies, addToCart);

module.exports = Router;