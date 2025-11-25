#! /usr/bin/env node
const { program } = require("commander");
const chalk = require("chalk").default;

const testConnection = require("./commands/testConnection");
const seedDatabase = require("./commands/seed");
const unseedDatabase = require("./commands/unseed");

program
  .command("test")
  .description("A test command")
  .action(() => {
    console.log(chalk.green("Test command executed"));
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

program
  .command("unseed")
  .description("Remove seed data from the database")
  .action(async () => {
    await unseedDatabase();
  });

program.parse();
