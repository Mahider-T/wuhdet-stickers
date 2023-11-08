const {uploadSticker, getStickersByTag, getAllStickers, getStickerById} = require('../controllers/stickers.controller');

const express = require('express');
const Router = express.Router();

const multer = require('multer');
const multerSticker = multer().single('sticker');

// Router.get('/',homePage);
Router.post('/uploadSticker', multerSticker, uploadSticker);
Router.get('/getAllStickers', getAllStickers);
Router.get('/getStickerById/:id', getStickerById);
Router.get('/getStickerByTag', getStickersByTag);

module.exports = Router;
