const {uploadSticker, getFeaturedStickers, getAllStickers, getStickerById, getStickersByTag} = require('../controllers/stickers.controller');
// const jwtCookies = require('../middlewares/jwtCookie');
const express = require('express');
const Router = express.Router();

const multer = require('multer');
const { jwtCookies } = require('../middlewares/jwtCookie');
const multerSticker = multer().single('sticker');

Router.get('/', getFeaturedStickers);
Router.post('/uploadSticker', multerSticker, uploadSticker);
Router.get('/getAllStickers', getAllStickers);
Router.get('/getStickerById/:id', getStickerById);
Router.get('/getStickersByTag/:tag', getStickersByTag);

module.exports = Router;
