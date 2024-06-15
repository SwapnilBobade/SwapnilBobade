const dotenv = require('dotenv');
const connectDB = require('./src/db/index');
const express = require("express")
const {app} = require("./app")
const usercontroller = require("./src/routes/user.routes.js")

//const app = express()

// Load environment variables from .env file
dotenv.config({
  path: './env'  // Ensure the correct path to your .env file
});

// Connect to the database
connectDB;

usercontroller;
app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}`)
})