const mongoose = require("mongoose");
const AuctionItem = require("../models/AuctionItem");

const MONGO_URI = "mongodb://localhost:27017";

module.exports = async function unseedDatabase() {
  try {
    // Connect to MongoDB & create/use mission5db
    await mongoose.connect(MONGO_URI, {
      dbName: "mission5db",
    });
    console.log("Connected to MongoDB successfully");

    // Remove all documents from the AuctionItem collection
    await AuctionItem.deleteMany({});
    console.log("Seed data removed");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error removing seed data:", error);
  }
};
