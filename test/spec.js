const Application = require("spectron").Application;
const assert = require("assert");
const electronPath = require("electron");
const path = require("path");

describe("Application launch", function() {
  this.timeout(10000);

  beforeEach(function() {
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

  it("runs without crashing", function() {
    return this.app.browserWindow.isVisible().then(function(isVisible) {
      assert.equal(isVisible, true);
    });
  });
});
