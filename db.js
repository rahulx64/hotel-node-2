const mongoose = require("mongoose");

// MongoDB connection URL
const url = "mongodb://127.0.0.1:27017/hotel-node";

// Connect to MongoDB using async/await and log messages
mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Handle MongoDB connection events
const db = mongoose.connection;
db.on("open", () => console.log("DB connection opened successfully"));
db.on("error", (err) => console.error("DB connection error:", err));
db.on("disconnected", () => console.log("DB disconnected"));

module.exports = db; // Exporting the connection object
