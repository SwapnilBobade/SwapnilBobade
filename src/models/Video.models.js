import mongoose,{Schema} from "mongoose";
import mongooseaggregatepaginatev2 from "mongoose-aggregate-paginate-v2"

const videoSchema = Schema({
    videoFile:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

videoSchema.plugin(mongooseaggregatepaginatev2)    //It is used to write the query

export const Video = mongoose.model("Video",videoSchema)