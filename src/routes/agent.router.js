const agentController = require('../controllers/agent.controller');
const express = require('express');
const Router  = express.Router();

Router.post('/addAgent', agentController.addAgent);
Router.post('/updateNumberOfDelivery', agentController.updateNumberOfDelivery);
module.exports = Router;