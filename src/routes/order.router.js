const express = require('express');
const router = express.Router();
const {addStickerForm, addStickersToDatabase} = require('../controllers/order.controller');
const {jwtCookies} = require('../middlewares/jwtCookie');

const multer = require('multer');
const uploadImages = multer().array('images');


router.get('/addSticker', addStickerForm);
router.post('/addSticker', uploadImages, jwtCookies, addStickersToDatabase);

module.exports = router;