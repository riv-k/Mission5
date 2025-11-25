const mongoose = require("mongoose");
const AuctionItem = require("../models/AuctionItem");
const seedData = require("../data/seedData");

const MONGO_URI = "mongodb://localhost:27017";

module.exports = async function seedDatabase() {
  try {
    // Connect to MongoDB & create/use mission5db
    const connection = await mongoose.connect(MONGO_URI, {
      dbName: "mission5db",
    });
    console.log("Connected to MongoDB");

    // Clear existing data - if any
    await AuctionItem.deleteMany({});

    // Insert seed data
    await AuctionItem.insertMany(seedData);
    console.log("Seed data inserted");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
