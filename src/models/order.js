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
        // required: true,
        ref: 'Agent'
    },

    //each order contains:
        //the item id,
        //dimension
        //quantity
    //the POST request should look something like this
    // [
    //     {
    //         id,
    //         dimension,
    //         quantity,
    //         price
    //     },
    //     {
    //         id,
    //         dimension,
    //         quantity,
    //         price
    //     }
    // ]
    //everytime an item is added to the cart,
        //check if that id exists in the cart
            //if it does, check if the current dimension and the dimension of the order in the cart are the same
                //if they are the same, increment
                //else create a new order json with the id, dimension, quantity and price and send it to the server  
    stickers: {
        type: [{
            id: mongoose.Schema.Types.ObjectId,
            // id: String,
            quantity : Number,
            dimension: String,
            price: Number
        }],
        // required : true
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

// orderSchema.pre("save", function() {
//     const numberOfStickers = stickers.length;

//     let totalPrice = 0;
//     const packageCost = {
//         5 : 150,
//         10 : 280,
//         20 : 540 
//     }
//     this.price = packageCost[numberOfStickers];

    
// })  

orderSchema.pre("save", function()  {
    let totalPrice = 0;
    this.stickers.forEach((order) => {
        totalPrice += order.price;
    })
    this.price = totalPrice;
})

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