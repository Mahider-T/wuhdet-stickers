const mongoose  = require('mongoose');

const agentSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
   absoluteLocation: {
    type: {
        type: String,
        enum: ['Point'],
        required: false
      },
      coordinates: {
        type: [Number],
        required: false
      }
   },
   relativeLocation: {
    subCity: {
        type: String,
        required: false
      },
      street: {
        type: String,
        required: false 
      },
      landmark: {
        type: String,
        required: false
      }
   },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    profileImage: {
        type: String,
        required: false,
        max: 255
    },
    hasDelivered: {
        type: Boolean,
        default: false,
        required: true
    },
    numberOfDeliveries: {
        type: Number,
        default: 0,
        required: true

    }
},{timestamps: true});

agentSchema.methods.incrementDelivery = function (additionalDelivery) {
    this.numberOfDeliveries += additionalDelivery;
}


module.exports = new mongoose.model('Agent', agentSchema);
