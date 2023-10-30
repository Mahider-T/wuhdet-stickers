const Order = require('../models/order');
const uploader = require('../utils/uploader');

const addStickersToDatabase = async (req, res) => {
    try{
        const newOrder = new Order({...req.body});
        newOrder.save();
        res.status(200).json({success: true, message: newOrder});
    } catch(error) {
        res.status(500).json({message: error.message})
    }
} 

module.exports = {addStickersToDatabase};

