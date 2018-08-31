const nativeUI = require("./nativeUI");

const saveToFile = content => {
  return nativeUI
    .getFileNameFromUser()
    .then(
      response => {
        return nativeUI.writeToFile(response, content);
      },
      () => {
        return Promise.reject();
      }
    )
    .then(
      () => {
        return nativeUI.displayInfoMessage(
          "File Saved",
          "Your document has been saved"
        );
      },
      error => {
        return nativeUI.displayErrorMessage(
          "An error has ocurred",
          error.message
        );
      }
    )
    .catch(() => {
      // noop
    });
};

module.exports = {
  saveToFile: saveToFile
};
