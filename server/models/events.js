import mongoose from "mongoose";

const EventSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    totalSeats:{
        type:Number,
        required:true,
    },
    bookedSeats:{
        type:Number,
        required:true,
    },
    images:{
        type:[String],
    }
},{timestamps:true});

const Event=mongoose.model("Event",EventSchema);
export default Event;