const asynchandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}






// const aynchandler=(fn)=>async()=>{
//     try {
//         await fn(req,res,next)
//     } catch (error){
//         res.status(error.code|| 500).json({
//             success:false,
//             message:error.message,

//         })
//     }
// }

module.exports = asynchandler