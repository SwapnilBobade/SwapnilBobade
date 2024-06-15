const mongoose = require('mongoose')
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,
        required:true,
       
    },
    coverImage:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    refreshTokn:{
        type:String
    },
  
},{timestamps:true})

UserSchema.pre("save",async function(next){             //hooks
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password,10)       //It is used to hash the password and to give the limit
    next()
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        email: this.email,
        fullName: this.fullName,
        username: this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

UserSchema.methods.generateRefreshToken = function(){
return jwt.sign({
    _id:this._id
},
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn: process.nextTick.REFRESH_TOKEN_EXPIRY
}
)
}


const User = mongoose.model("User",UserSchema)

module.exports = User
    