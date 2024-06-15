//import {asynchandler} from "../utils/asynchandler.js";
const asynchandler = require('../utils/asynchandler.js')
const ApiError = require('../utils/ApiError.js')
const User = require('../models/user.models.js')
const uploadonCloudinary = require('../utils/cloudnary.js')
const ApiResponse = require('../utils/ApiResponse.js')

const generateAndRefereshTokens = async()=>{
    try {
        const user = await User.findById(userId)
        const accesstokens = user.generateAccessToken()
        const refreshtokens = user.generateRefreshtoken()

        user.refreshtokens = refreshtokens()
        await user.save({validateBeforeSave: false})

        return {refreshtokens,accesstokens}
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating access tokens and referesh tokens")
    }
}

const registerUser = asynchandler(async(req,res)=> {
    const {email,fullname,password,username}=req.body
    console.log("email:",email);

    if(
        [email,fullname,password,username ].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
      });
    
      if (existedUser) {
        throw new ApiError(409, "User with name or email already existed");
      }
    
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required")
    }

    const avatar = await uploadonCloudinary(avatarLocalPath)
    const coverImage = await uploadonCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar is required")
    }

    User.create({
        fullName:fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser = await User.findById(User._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500,"Something went Wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Successfully")
    )

  

}) 

const loginUser = asynchandler(async(req,res)=>{
    const {email,password,username} = req.body

    if(!email && !username){
        throw new ApiError(400,"Email or Username is required")
    }

    const user = await User.findOne({
        $or:[{username},{email}]
    })
    
    if(!user){
        throw new ApiError(404,"User not found")
    }

    const isPassword = await user.isPasswordCorrect(password)

    if(!isPassword){
        throw new ApiError(401,"Password is Incorrect")
    }

    const {accesstokens,refreshtokens}=await generateAndRefereshTokens(user._id)

    const loggedInUsers = await User.findById(User._id).select("-password -refreshTokens")

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accesstokens",accesstokens,options)
    .cookie("refreshtokens",refreshtokens,options)
    .json(
        new ApiResponse(
            200,
            {
            user: loggedInUsers,accesstokens,refreshtokens
            },
            "User Logged in Successfully"
        )
    )
})

const logOutUser = asynchandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        
        req.user._id,
        {
        $set:{
            refreshtokens:undefined
        },
       
    },
{
    
        new:true
    
})

const options={
    httpOnly:true,
    secure:true
}

return res
.status(200)
.Clearcookie("accesstokens",options)
.Clearcookie("refreshtokens",options)
.json(new ApiResponse(200,{},"User loggedout Successfuly"))
})

module.exports = {
    registerUser,loginUser,logOutUser
}

