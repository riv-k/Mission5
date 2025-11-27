const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AuctionItem = require("api/models/AuctionItem.js");

const router = express.Router();
dotenv.config();

router.get("/", async (req, res) => {
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
});

module.exports = router;
