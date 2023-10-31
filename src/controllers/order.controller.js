const Order = require('../models/order');
const uploader = require('../utils/uploader');

const addStickersToDatabase = async (req, res) => {
    // try{
    //     const newOrder = new Order({...req.body});
    //     newOrder.save();
    //     console.log(req.user);
    //     res.status(200).json({success: true, message: newOrder});
    // } catch(error) {
    //     res.status(500).json({message: error.message})
    // }
    res.send("Added Sticker!")
} 

const addStickerForm = async (req, res) =>{
    res.render('addSticker');
}

module.exports = {addStickersToDatabase, addStickerForm};

