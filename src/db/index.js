//import mongoose from "mongoose";
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//const {DB_NAME} = require('./constant')

dotenv.config();

const connectDB = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})
.then(() => {
    console.log(`***************Connection Successful***************`);
})
.catch((err) => {
    console.error("Error while connecting");
});

module.exports = connectDB;