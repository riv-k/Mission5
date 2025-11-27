const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AuctionItem = require("./../models/AuctionItem");

const router = express.Router();
dotenv.config();

router.get("/", async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
    const connection = await mongoose.connect(MONGO_URI, {
      dbName: "mission5db",
      serverSelectionTimeoutMS: 500,
    });

    const filter = keyword
      ? {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const items = await AuctionItem.find(filter);

    await mongoose.disconnect();

    res.status(200).json({ auctionItems: items });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch auction items" });
  }
});

module.exports = router;
