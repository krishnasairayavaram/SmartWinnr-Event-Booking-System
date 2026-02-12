import mongoose from "mongoose";
const BookingSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true,
    },
    paymentStatus:{
        type:Boolean,
        default:false,
    },
    seatsBooked:{
        type:Number,
    }
},{timestamps:true});

const Bookings=mongoose.model("Booking",BookingSchema);
export default Bookings;