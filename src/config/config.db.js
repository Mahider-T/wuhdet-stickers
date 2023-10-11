const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/wuhdet';

try {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("Connected to MongoDB successfully");
} catch (error) {
    console.error("Could not connect to database");
}



module.exports = mongoose;