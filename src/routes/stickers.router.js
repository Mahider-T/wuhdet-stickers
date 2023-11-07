const {uploadSticker, getAllStickers, getStickersByTag} = require('../controllers/stickers.controller');

const express = require('express');
const Router = express.Router();

const multer = require('multer');
const multerSticker = multer().single('sticker');


Router.post('/uploadSticker', multerSticker, uploadSticker);
Router.get('/getAllStickers', getAllStickers);
Router.get('/getStickerByTag', getStickersByTag);

module.exports = Router;
