#! /usr/bin/env node
const { program } = require("commander");

const testConnection = require("./commands/testConnection");

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

program.parse();
