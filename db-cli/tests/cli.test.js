const { exec } = require("child_process");
const mongoose = require("mongoose");
const AuctionItem = require("../models/AuctionItem");

const MONGO_URI = "mongodb://localhost:27017/mission5db";

describe("CLI Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

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
      try {
        expect(stdout).toContain("Seed data inserted\n");
        const items = await AuctionItem.find({});
        expect(items.length).toBe(3); // change if we modify seed data
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it("should clear the seed data from the database", (done) => {
    exec(`mission5 unseed`, async (error, stdout, stderr) => {
      try {
        expect(stdout).toContain("Seed data removed\n");
        const items = await AuctionItem.find({});
        expect(items.length).toBe(0);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it("should improve error handling and reporting", (done) => {
    exec(
      `mission5 seed`,
      { env: { ...process.env, MONGO_URI: "mongodb://invalidhost:27017" } },
      (error, stdout, stderr) => {
        // console.log("STDOUT:", stdout);
        // console.log("STDERR:", stderr);
        expect(stderr).toContain("Error seeding database:");
        done();
      }
    );
  });

  it("should not duplicate data on multiple seed runs", (done) => {
    exec(`mission5 seed`, () => {
      exec(`mission5 seed`, async () => {
        try {
          const items = await AuctionItem.find({});
          expect(items.length).toBe(3); // should still be 3 && change if we modify seed data
          done();
        } catch (error) {
          done(error);
        }
      });
    });
  });

  it("should not throw error on multiple unseed runs", (done) => {
    exec(`mission5 unseed`, () => {
      exec(`mission5 unseed`, async (error, stdout, stderr) => {
        try {
          const items = await AuctionItem.find({});
          expect(items.length).toBe(0); // should still be 0
          expect(stdout).toContain("Seed data removed\n");
          done();
        } catch (error) {
          done(error);
        }
      });
    });
  });
});
