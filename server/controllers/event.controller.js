import Event from "../models/events.js";
import Bookings from "../models/bookings.js";

export const getEvents=async(req,res)=>{
    try{
        const events=await Event.find({});
        res.status(200).json(events);
    }catch (error) {
        res.status(500).json({message:"Error fetching events", error: error.message});
    }
}

export const addEvent = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const { title, description, date, price, totalSeats } = req.body;
        
        const imageUrl = req.file ? req.file.path : "https://via.placeholder.com/400x200?text=No+Image";

        const newEvent = new Event({
            title,
            description,
            date,
            price,
            totalSeats,
            bookedSeats: 0,
            images: [imageUrl]
        });

        await newEvent.save();
        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: "Error adding event", error: error.message });
    }
};

export const bookTickets=async(req,res)=>{
    try{
        const {eventId,seatsBooked}=req.body;
        const userId=req.user._id;
        const event=await Event.findById(eventId);
        if(!event){
            return res.status(404).json({message: "Event not found"});
        }
        if(event.bookedSeats+seatsBooked > event.totalSeats){
            return res.status(400).json({message:"Not enough seats available"});
        }
        const newBooking=new Bookings({
            userId,
            eventId,
            seatsBooked,
            paymentStatus:true,
        });
        await newBooking.save();
        event.bookedSeats+=seatsBooked;
        await event.save();
        res.status(201).json({message:"Tickets booked successfully",booking:newBooking});
    }catch(error) {
        res.status(500).json({message:"Booking failed",error:error.message});
    }
}

export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Bookings.find({ userId: req.user._id }).populate('eventId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching history", error: error.message });
    }
};