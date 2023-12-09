const Order = require('../models/order');

const addToCart = async (req, res) => {
    try{

        const { quantity, agentId, dimension } = req.body;
        const customerId = req.user.id;

        console.log(req.url);

        // const urlObject = new URL(req.url);
        // const pathSegments = urlObject.pathname.split("/");
        // const stickerId = pathSegments[pathSegments.length - 1];
        const stickerId = req.url.slice(1);
        console.log(stickerId);
        
        const stickerOrder = {
            _id : stickerId,
            quantity,
            dimension
        }

        const newOrder = new Order({
            customerId,
            agentId,
            stickers: [stickerOrder]   
        })

        const theOrder = await newOrder.save();
        res.send(theOrder);

    }catch(error){ 
        console.log(error)
        res.status(500).json({success: "False", message : error.message});
    }
}

module.exports = {addToCart};