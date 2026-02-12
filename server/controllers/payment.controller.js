import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const { event, seatsBooked } = req.body;
        if (!event || !event.price || !seatsBooked) {
            return res.status(400).json({ message: "Missing event details or seat count" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: event.title,
                            description: event.description || "Event Ticket",
                        },
                        unit_amount: Math.round(parseFloat(event.price) * 100), 
                    },
                    quantity: parseInt(seatsBooked),
                },
            ],
            mode: "payment",
            success_url: `http://localhost:5173/success?eventId=${event._id}&seats=${seatsBooked}`,
            cancel_url: `http://localhost:5173/`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Error:", error.message);
        res.status(500).json({ message: "Stripe Session Failed", error: error.message });
    }
};