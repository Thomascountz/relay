const assert = require("assert");

describe("Application Launch", function() {
  it("opens a new document", function() {
    return this.app.client.getValue("textarea").then(function(value) {
      console.log(value);
    });
  });
});
