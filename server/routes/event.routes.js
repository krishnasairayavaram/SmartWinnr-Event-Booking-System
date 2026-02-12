import express from "express";
import {protect} from "../middleware/auth.middleware.js";
import { getEvents,addEvent,bookTickets,getMyBookings } from "../controllers/event.controller.js";
import { upload } from "../middleware/upload.middleware.js";


const router=express.Router();
router.get("/events",getEvents);
router.post("/add", protect, upload.single("image"), addEvent);
router.post("/bookings",protect,bookTickets);
router.get("/my-bookings", protect, getMyBookings);

export default router;