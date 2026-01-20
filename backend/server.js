const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Import Routes
const scanRoutes = require("./routes/scanRoutes");

// Use Routes
app.use("/api/scans", scanRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
