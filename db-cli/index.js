#! /usr/bin/env node

const { program } = require("commander");

program
  .command("test")
  .description("A test command")
  .action(() => {
    console.log("Test command executed");
  });

program.parse();
