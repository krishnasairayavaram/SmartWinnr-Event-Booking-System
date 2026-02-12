import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import EventRouter from "./routes/event.routes.js";
import paymentRoutes from "./routes/payment.routes.js";


const app=express();
app.use(express.json());
app.use(cors({ 
  origin: [
    "https://smart-winnr-event-booking-system.vercel.app",
    "https://smart-winnr-event-boo-git-2aac8c-krishna-sais-projects-e88889b1.vercel.app"
  ],
  credentials: true 
}));
const MONGO_URL=process.env.MONGO_URL;
const connectDB=async()=>{
    try{
        mongoose.connection.on("connected",()=>{
            console.log("Database connected successfully");
        });
        await mongoose.connect(`${MONGO_URL}/smartwinnr`);
    }catch(error){
        console.error("Database connection failed:", error);
    }
}

connectDB();
app.get("/",(req,res)=>{
    res.send("SmartWinnr Backend API is running...");
})

const PORT=process.env.PORT||5000;
app.use("/api/auth",authRouter);
app.use("/api/event",EventRouter);
app.use("/api/payment", paymentRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
