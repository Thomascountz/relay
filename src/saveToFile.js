const { dialog } = require("electron");
const fs = require("fs");

exports.saveToFile = function(content) {
  dialog.showSaveDialog(fileName => {
    if (fileName === undefined) {
      return;
    }
    fs.writeFile(fileName, content, err => {
      if (err) {
        dialog.showErrorBox("An error has ocurred ", err.message);
      }
      dialog.showMessageBox({
        type: "info",
        title: "File saved",
        message: fileName + " has been saved."
      });
    });
  });
};
