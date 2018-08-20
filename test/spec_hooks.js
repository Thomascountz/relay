const Application = require("spectron").Application;
const electronPath = require("electron");
const path = require("path");

beforeEach(function() {
  this.timeout(10000);
  this.app = new Application({
    path: electronPath,
    args: [path.join(__dirname, "..")]
  });
  return this.app.start();
});

afterEach(function() {
  if (this.app && this.app.isRunning()) {
    return this.app.stop().catch(function(error) {
      console.error("Test failed", error.message);
    });
  }
});
