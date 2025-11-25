const mongoose = require("mongoose");
const chalk = require("chalk").default;

const MONGO_URI = "mongodb://localhost:27017";

module.exports = async function testConnection() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(chalk.green("Connected to MongoDB successfully"));
    await mongoose.disconnect();
  } catch (error) {
    console.error(chalk.red("Failed to connect to MongoDB:"), error);
  }
};
