#! /usr/bin/env node
const { program } = require("commander");

const testConnection = require("./commands/testConnection");
const seedDatabase = require("./commands/seed");

program
  .command("test")
  .description("A test command")
  .action(() => {
    console.log("Test command executed");
  });

program
  .command("test-connection")
  .description("Test MongoDB connection")
  .action(async () => {
    await testConnection();
  });

program
  .command("seed")
  .description("Seed the database with initial data")
  .action(async () => {
    await seedDatabase();
  });

program.parse();
