const nativeUI = require("./nativeUI");
const fs = require("fs");

const saveToFile = content =>
  new Promise((resolve, reject) => {
    const fileName = nativeUI.getFileNameFromUser();
    if (fileName === undefined) {
      reject();
      return;
    }

    fs.writeFile(fileName, content, error => {
      if (error) {
        nativeUI.displayErrorMessage("An error has occurred", error.message);
        reject();
        return;
      }
    });

    nativeUI.displayInfoMessage("File Saved", "Your document has been saved.");
    resolve();
  });

module.exports = {
  saveToFile: saveToFile
};
