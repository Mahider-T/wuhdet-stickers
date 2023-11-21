const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_LOCAL_CONN_URL;

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