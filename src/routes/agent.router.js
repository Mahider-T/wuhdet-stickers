const agentController = require('../controllers/agent.controller');
const express = require('express');
const Router  = express.Router();

const multer = require('multer');
const upload = multer().single('profileImage');

Router.post('/addAgent', agentController.addAgent);
Router.put('/updateAgentDetails/:agentId', upload, agentController.updateAgentDetails);
Router.post('/updateNumberOfDelivery', agentController.updateNumberOfDelivery);
module.exports = Router;