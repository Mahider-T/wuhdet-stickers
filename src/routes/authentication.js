const express = require('express');
const router = express.Router();

const {registerUser} = require('../controllers/user.register')

router.post('/registerUser', registerUser);

module.exports = router;
