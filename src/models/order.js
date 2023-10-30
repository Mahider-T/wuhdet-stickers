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
    status: {
        type: String,
        required: true,
        enum: ['Production', 'With agent', 'With customer'],
        default: "Production"
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
    stickers: {
        type: [String],
        required : true
    }
    // packageUsed: {

    // }
},{timestamps: true})

module.exports = mongoose.model('Orders', orderSchema);