require('dotenv').config();
// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Basic test route
app.get("/", (req, res) => {
  res.send("Server is running successfully ✅");
});

// Routes
const noteRoutes = require("./routes/noteRoutes");
app.use("/api/notes", noteRoutes); // <-- move this here, before app.listen

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
