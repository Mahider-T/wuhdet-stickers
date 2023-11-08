const Order = require('../models/order.controller')

exports.newCart = async (req, res, next) => {
    try{
        const newOrder = new Order({
            customerId: req.user.id,
        })
        await newOrder.save();
        next()
    }catch(error){
        throw error.message
    }
    
}