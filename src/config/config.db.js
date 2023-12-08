const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_LOCAL_CONN_URL;
console.log(mongoURI);

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to mongodb successfully"))
.catch((error) => console.log("Error connecting to MognoDB", error))
console.log("Connected to MongoDB successfully");


module.exports = mongoose;