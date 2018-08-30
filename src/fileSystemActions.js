const nativeUI = require("./nativeUI");

const saveToFile = content => {
  return nativeUI
    .getFileNameFromUser()
    .then(
      fileName => {
        return nativeUI.writeToFile(fileName, content);
      },
      () => {
        return;
      }
    )
    .then(() => {
      return nativeUI.displayInfoMessage(
        "File Saved",
        "Your document has been saved"
      );
    })
    .catch(error => {
      return nativeUI.displayErrorMessage(
        "An error has ocurred",
        error.message
      );
    });
};

module.exports = {
  saveToFile: saveToFile
};
