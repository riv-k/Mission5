const mongoose = require("mongoose");
const chalk = require("chalk").default;
const AuctionItem = require("../models/AuctionItem");

const MONGO_URI = "mongodb://localhost:27017";

module.exports = async function unseedDatabase() {
  try {
    // Connect to MongoDB & create/use mission5db
    await mongoose.connect(MONGO_URI, {
      dbName: "mission5db",
    });
    console.log(chalk.green("Connected to MongoDB successfully"));

    // Remove all documents from the AuctionItem collection
    await AuctionItem.deleteMany({});
    console.log(chalk.green("Seed data removed"));
    await mongoose.disconnect();
  } catch (error) {
    console.error(chalk.red("Error removing seed data:"), error);
  }
};
