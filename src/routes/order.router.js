const express = require('express');
const router = express.Router();
const {addStickerForm, addStickersToDatabase} = require('../controllers/order.controller');
const {jwtCookies} = require('../middlewares/jwtCookie');

router.get('/addSticker', addStickerForm);
router.post('/addSticker', jwtCookies, addStickersToDatabase);

module.exports = router;