const Order = require('../models/order');
const uploader = require('../utils/uploader');

const addStickersToDatabase = async (req, res) => {

    // In a single order:
        //there is an array of links for the stickers
        //agent of customer's choice
    // try{
    //     const newOrder = new Order({...req.body});
    //     newOrder.save();
    //     console.log(req.user);
    //     res.status(200).json({success: true, message: newOrder});
    // } catch(error) {
    //     res.status(500).json({message: error.message})
    // }
    console.log(req.user);
    res.send("Added Sticker!")
} 

const addStickerForm = async (req, res) =>{
    res.render('addSticker');
}

module.exports = {addStickersToDatabase, addStickerForm};

