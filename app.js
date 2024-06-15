const express = require('express')
const cors = require('cors')
const cookieparser = require('cookie-parser')
//import userRouter from "./src/routes/user.routes.js"
const userRouter = require('./src/routes/user.routes.js')
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
//app.use(express.bodyParser({limit: '50mb'}));
app.use(cookieparser())

app.use("/api/v1/users",userRouter)

module.exports={app}