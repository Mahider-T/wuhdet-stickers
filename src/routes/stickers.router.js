const {uploadSticker, getFeaturedStickers, getAllStickers, getStickerById, getStickersByTag} = require('../controllers/stickers.controller');

const express = require('express');
const Router = express.Router();

const multer = require('multer');
const multerSticker = multer().single('sticker');

// Router.get('/',homePage);
Router.post('/uploadSticker', multerSticker, uploadSticker);
Router.get('/getAllStickers', getAllStickers);
Router.get('/getStickerById/:id', getStickerById);
Router.get('/', getFeaturedStickers);
Router.get('/getStickersByTag', getStickersByTag);

module.exports = Router;
