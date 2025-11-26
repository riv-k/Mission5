const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get all auction items");
});

module.exports = router;
