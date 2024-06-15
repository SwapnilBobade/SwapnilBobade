//Need to upload the file from multer and upload on localsystem, and further by using cloudnary we need to upload on server. 
//The cloudnary is third party service which works like AWS. We can keep it in utility also or seperate file.
const { v2: cloudinary } = require('cloudinary');

const fs = require('fs')


    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_CLOUD_API, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
    });
    
const uploadonCloudinary = async(localfilepath)=>{
    try {
        if(!localfilepath) return null
        //used to upload the image
        const response = await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })
        //console.log("File has been uploaded successfully",response.url);
        fs.unlinkSync(localfilepath)  
        return response
    } catch (error) {
        //fs.unlinkSync(localfilepath)    //removes the locally saved file for temporary purpose which got failed
        return null
    }
}

module.exports = uploadonCloudinary
  
