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
        required: true,
        ref: 'Agent'
    },
    stickers: {
        type: [{
            id: mongoose.Schema.Types.ObjectId,
            // id: String,
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

orderSchema.pre("save", function() {
    const numberOfStickers = stickers.length;

    let totalPrice = 0;
    const packageCost = {
        5 : 150,
        10 : 280,
        20 : 540 
    }
    this.price = packageCost[numberOfStickers];

    
})  

orderSchema.methods.createOrder = function() {

}

// orderSchema.pre("save", function(){
    // const thisOrder = this;
    //Let user choose agent
    //Let the user choose a location(agent)
    //What the user sees is the location
    //what is sent to the backend is the stings with pattern 'location*'
    //these strings with the given pattern are matched to an agent with the following object
    // const agentMapping = {
    //     location1 :  `653a61fce7f34cae19f4df34` // this is the id of the agent that works on location1
    // }
    // thisOrder.agentId = agentMapping[thisOrder.agentId];

// })

module.exports = mongoose.model('Orders', orderSchema);