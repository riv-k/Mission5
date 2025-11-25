const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chalk = require("chalk").default;

const AuctionItem = require("../models/AuctionItem");
const seedData = require("../data/seedData");

dotenv.config();

module.exports = async function seedDatabase() {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

    // Connect to MongoDB & create/use mission5db
    const connection = await mongoose.connect(MONGO_URI, {
      dbName: "mission5db",
      serverSelectionTimeoutMS: 500,
    });
    console.log(chalk.green("Connected to MongoDB"));

    // Clear existing data - if any
    await AuctionItem.deleteMany({});

    // Insert seed data
    await AuctionItem.insertMany(seedData);
    console.log(chalk.green("Seed data inserted"));

    await mongoose.disconnect();
  } catch (error) {
    console.error(chalk.red("Error seeding database:"), error.message);
  }
};
