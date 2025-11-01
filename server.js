import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv"; //? load environment variables
dotenv.config(); //? Load env variables
// Routes
import authRoutes from "./routes/authRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import levelRoutes from "./routes/levelRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import unitRoutes from "./routes/unitRoutes.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
// register & verify & login & forgot password & reset password
app.use("/auth", authRoutes);
// Add level (Admin) & get all levels
app.use("/levels", levelRoutes);
// create session & send webhook
app.use("/stripe", stripeRoutes);
// get purchases for a specific user & get all purchases (Admin)
app.use("/purchases", purchaseRoutes);
// for units: 
app.use("/units", unitRoutes);
// get all users (Admin)
import User from "./models/userModel.js";
import { verifyToken, verifyAdmin } from "./middleware/authMiddleware.js";
app.use("/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});





// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
