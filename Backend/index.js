import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bookRoute from "./routes/book_route.js";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import contactroute from "./routes/contact_route.js";
import orderroute from "./routes/order_route.js";
import Razorpay from "razorpay";
import { createHmac } from "node:crypto";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
}));
const PORT = process.env.PORT || 3000;

// MongoDB connection
try {
  mongoose.connect(process.env.VITE_MongoDBURI);
  console.log("Connected To MongoDB");
} catch (error) {
  console.log("MongoDB Connection Error: ", error);
}

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactroute);
app.use("/product", orderroute);
app.use('/admin',adminRoute);

app.post("/order", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ error: "Missing order parameters" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount,
      currency,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ error: "Failed to create order" });
    }

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).send("Server Error");
  }
});

// Razorpay validation
app.post("/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sha = createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: " Transaction is not legit !" });
  }
  res.json({ msg: " Transaction is legit!", orderId: razorpay_order_id, paymentId: razorpay_payment_id });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
