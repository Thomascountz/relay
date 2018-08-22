const assert = require("assert");

describe("Application launch", function() {
  it("runs without crashing", function() {
    return this.app.browserWindow.isVisible().then(function(isVisible) {
      assert.equal(isVisible, true);
    });
  });
});
