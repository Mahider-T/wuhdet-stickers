const Order = require('../models/order');
const uploader = require('../utils/uploadOne');

const addStickersToDatabase = async (req, res) => {

    try {
        const {images} = req.body;
        images.forEach(image => {
            console.log(image);
        });
        return res.json({image: images[0]});
        return res.send(`the type of images variable is ${typeof images}`);

    } catch(error) {
        return res.json({error: error.message});
    }
    // console.log(req.user);
    res.send("Added Sticker!")
} 

const addStickerForm = async (req, res) =>{
    res.render('addSticker');
}

module.exports = {addStickersToDatabase, addStickerForm};

