const express = require("express");
const { addToCart, displayTotal, verifyCard } = require('../controllers/order.controller');
const Router = express.Router();
const { jwtCookies } = require('../middlewares/jwtCookie');
const bodyParser = require("body-parser");


Router.post('/:stickerId', jwtCookies, addToCart);
Router.get("/checkout/:orderId", displayTotal);
Router.post("/payment/verifyPayment/:orderId", verifyCard)

module.exports = Router;