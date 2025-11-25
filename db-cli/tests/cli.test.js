const { exec } = require("child_process");
const mongoose = require("mongoose");
const AuctionItem = require("../models/AuctionItem");

const MONGO_URI = "mongodb://localhost:27017/mission5db";

describe("CLI Tests", () => {
  it("should have 'mission5 test' implemented", (done) => {
    exec(`mission5 test`, (error, stdout, stderr) => {
      expect(stdout).toEqual("Test command executed\n");
      done();
    });
  });

  it("should connect to MongoDB", (done) => {
    exec(`mission5 test-connection`, (error, stdout, stderr) => {
      expect(stdout).toContain("Connected to MongoDB successfully\n");
      done();
    });
  });

  it("should add real seed data to the database", (done) => {
    exec(`mission5 seed`, async (error, stdout, stderr) => {
      expect(stdout).toContain("Seed data inserted\n");

      await mongoose.connect(MONGO_URI);
      const items = await AuctionItem.find({});
      expect(items.length).toBe(3); // change if we modify seed data
      await mongoose.disconnect();

      done();
    });
  });

  it("should clear the seed data from the database", (done) => {
    exec(`mission5 unseed`, async (error, stdout, stderr) => {
      expect(stdout).toContain("Seed data removed\n");

      await mongoose.connect(MONGO_URI);
      const items = await AuctionItem.find({});
      expect(items.length).toBe(0);
      await mongoose.disconnect();

      done();
    });

  });
  it.todo("should improve error handling and reporting");
});
