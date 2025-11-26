const express = require("express");
const ItemsRouter = require("../routes/items");
const request = require("supertest");
const { describe, test, expect } = require("@jest/globals");

const app = express();

app.use("/api/items", ItemsRouter);

describe("GET /api/items", () => {
  it.todo("Should return status code 200");
  it.todo("Should Connect with Database and return items");
  it.todo("Should return an empty array if no items exist");
  it.todo("Should filter items based on keyword search");
  it.todo("Should handle database errors gracefully");
});
