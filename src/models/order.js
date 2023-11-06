const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    agentId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Agent'
    },
    stickers: {
        type: [String],
        required : true
    },

    status: {
        type: String,
        required: true,
        enum: ['Not started', 'Production', 'With agent', 'With customer'], 
        default: "Not started" // status shall change to Production when we confirm that the user has paid
    },
    complaint: {
        type: String,
        enum: ['Package is damaged', 'Lost the agent', 'Rude agent', 'Wrong package', 'Wrong size']
    },
    hasPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    pricePerSticker: {
        type:Number,
    }
},{timestamps: true})

orderSchema.methods.packageType = function() {
    const numberOfStickers = stickers.length;

    const priceToPackage = {

    }
    const packageCost = {
        firstPackage : 50,
        secondPackage : 45,
        thirdPackage : 40 
    }
    
}

module.exports = mongoose.model('Orders', orderSchema);