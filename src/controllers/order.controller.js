const Order = require('../models/order');

const { isValidCreditCard } = require('../utils/verifyCardUtils');

const addToCart = async (req, res) => {
    try{

        const quantity  = req.body.quantity;
        const agentId = req.body.agentId;
        const dimension = req.body.dimension;
        const customerId = req.user.id;
        // console.log(req.url);

        // const urlObject = new URL(req.url);
        // const pathSegments = urlObject.pathname.split("/");
        // const stickerId = pathSegments[pathSegments.length - 1];

        const stickerId = req.url.slice(1);

        // console.log(stickerId);
        
        const stickerOrder = {
            _id : stickerId,
            quantity: Number(quantity),
            dimension
        }

        const newOrder = new Order({
            customerId,
            agentId,
            stickers: [stickerOrder]   
        })

        const theOrder = await newOrder.save();
        return res.redirect(`/api/orders/checkout/${theOrder._id}`)

    }catch(error){ 
        // console.log(error)
        return res.status(500).json({success: "False", message : error.message});
    }
}

const displayTotal = async(req, res, error) => {

    error = ""
    const orderId = req.params.orderId;
    try {
        let order = await Order.findOne({
            _id : orderId
        }, "price");

        price = order.price;
        return res.render("total", {price, orderId});
    }catch(error){
        return res.status(500).json({success: "False", message: error.message})
    }
}

const verifyCard = async(req, res) => {

    const { card } = req.body;
    const orderId = req.params.orderId;
    console.log(card);

    let error = "Wrong card";
    const cardIsValid = isValidCreditCard(Number(card));
    console.log(cardIsValid);
    try{
        if(cardIsValid) {
            return res.render("success");
        } 
        let error = "Your card number is invalid. Please try again.";

        const orderId = req.params.orderId;

        let order = await Order.findOne({
            _id : orderId
        }, "price");

        price = order.price;
        return res.render("total", {price, orderId, error});

        // return displayTotal(error);
    
    }catch(error) {
        res.status(500).json({success : "False", message: error.message});
    }

    

}

module.exports = {addToCart, displayTotal, verifyCard};