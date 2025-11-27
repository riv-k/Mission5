const express = require("express");
const ItemsRouter = require("../routes/items");
const request = require("supertest");
const { describe, test, expect } = require("@jest/globals");
const { exec } = require("child_process");

const app = express();

app.use("/api/items", ItemsRouter);

describe("GET /api/items", () => {
  // Helper function to execute shell commands and return a promise before fetching
  const execAsync = (cmd) =>
    new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) return reject(error);
        resolve({ stdout, stderr });
      });
    });

  it("Should return status code 200", async () => {
    const res = await request(app).get("/api/items");
    expect(res.statusCode).toBe(200);
  });

  it("Should connect to the database and return all items (no filtering yet)", async () => {
    // Seed the database first so that there is data to retrieve
    await execAsync("mission5 seed");

    const res = await request(app).get("/api/items");
    expect(res.body.auctionItems.length).toBe(3); // change if we modify seed data
  });

  it("Should return an empty array if no items exist (no filtering yet)", async () => {
    // Unseed the database first so that there is NO data to retrieve
    await execAsync("mission5 unseed");

    const res = await request(app).get("/api/items");
    expect(res.body.auctionItems.length).toBe(0);
  });

  it("Should filter items based on keyword search (searches title and description)", async () => {
    await execAsync("mission5 seed");

    const keyword = "Vintage";
    const res = await request(app).get(`/api/items?keyword=${keyword}`);

    expect(res.body.auctionItems.length).toBe(2);

    // All returned items should have the keyword in their title or description
    res.body.auctionItems.forEach((item) => {
      const inTitle = item.title.toUpperCase().includes(keyword.toUpperCase());
      const inDescription = item.description
        .toUpperCase()
        .includes(keyword.toUpperCase());
      expect(inTitle || inDescription).toBe(true);
    });
  });

  it("Should handle database errors gracefully", async () => {
    // Temporarily set MONGO_URI to an invalid host
    const originalUri = process.env.MONGO_URI;
    process.env.MONGO_URI = "mongodb://invalidhost:27017";

    const res = await request(app).get("/api/items");

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("error"); 

    // Restore original URI
    process.env.MONGO_URI = originalUri;
  });
});
