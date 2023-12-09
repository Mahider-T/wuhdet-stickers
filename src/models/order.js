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
            id: mongoose.Schema.Types.ObjectId,
            quantity : Number,
            dimension: String,
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
        type:Number,
    }
},{timestamps: true})

module.exports = mongoose.model('Orders', orderSchema);