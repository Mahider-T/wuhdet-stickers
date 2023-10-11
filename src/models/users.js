const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        // validate: {
        //     validator : function (phone) {
        //         return /^0[0-9]{9}$/.test(phone)
        //     },
        //     message : 'That doesn\'t look like a proper phone number' 
        // }
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
    // validate: {
    //     validator: function (email) {
    //         return /^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    //     },
    //     message: 'Please enter a valid email address,',
    // }
})

const user = mongoose.model('users', userSchema)

module.exports = user;