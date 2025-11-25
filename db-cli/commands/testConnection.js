const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/mission5db";

module.exports = async function testConnection() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};