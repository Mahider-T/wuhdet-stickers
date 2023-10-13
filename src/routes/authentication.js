const express = require('express');
const router = express.Router();
router.use(express.json());

const registerUser = require('../controllers/user.register')

router.post('/registerUser', registerUser.saveUser);

module.exports = router;
