const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    agentId : {
        //on the front end, the value attribute of the input should be the id of the corresponding agent
        //but what is displayed to the user it the relative location of the agent
        type: mongoose.Schema.Types.ObjectId,
        default: null, 
        ref: 'Agent'
    },

    stickers: {
        type: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required : true
            },
            quantity : {
                type : Number,
                required : true
            },
            dimension: {
                type: String,
                required: true
            }
        }],
        required : true
    },

    status: {
        type: String,
        enum: ['Not started', 'Production', 'With agent', 'With customer'], 
        default: "Not started" // status shall change to Production when we confirm that the user has paid
    },
    complaint: {
        type: String,
        enum: ['Package is damaged', 'Lost the agent', 'Rude agent', 'Wrong package', 'Wrong size']
    },
    hasPaid: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0,
        required: true
    }
},{timestamps: true})

orderSchema.pre('save', function() {
    const singleStickerPrice = {
        small : 50,
        medium : 70,
        large : 100
    }
    let totalPrice = 0;
    this.stickers.forEach(function(sticker){
        totalPrice += singleStickerPrice[sticker.dimension] * sticker.quantity;
    })
    this.price = totalPrice;
        console.log(`The total price is ${totalPrice}`);
} )

module.exports = mongoose.model('Orders', orderSchema);