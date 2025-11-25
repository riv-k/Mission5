const { exec } = require("child_process");

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

  it.todo("should add real seed data to the database");
  it.todo("should clear the seed data from the database");
  it.todo("should improve error handling and reporting");
});
