const mongoose = require('mongoose');
require('dotenv').config()

async function dbConnect() {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected successfully to Database")
    })
    .catch((error) => {
        console.log("Error in connecting to database")
        console.log(error)
    })
}

module.exports = dbConnect