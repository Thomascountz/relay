const nativeUI = require("./nativeUI");
const fs = require("fs");

const saveToFile = content => {
  const fileName = nativeUI.getFileNameFromUser();
  if (fileName === undefined) {
    return;
  }
  fs.writeFile(fileName, content, error => {
    if (error) {
      nativeUI.displayErrorMessage("An error has occurred", error.message);
    } else {
      nativeUI.displayInfoMessage(
        "File Saved",
        "Your document has been saved."
      );
    }
  });
};

module.exports = {
  saveToFile: saveToFile
};
