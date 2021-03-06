const nativeUI = require("./nativeUI");

const saveToFile = content => {
  return nativeUI
    .getFileNameToSaveFromUser()
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

const openFromFile = () => {
  return nativeUI
    .getFileNameToOpenFromUser()
    .then(
      fileName => {
        return nativeUI.readFromFile(fileName);
      },
      () => {
        return Promise.reject();
      }
    )
    .then(null, error => {
      return nativeUI.displayErrorMessage(
        "An error has occured",
        error.message
      );
    })
    .catch(() => {
      // noop
    });
};

module.exports = {
  saveToFile: saveToFile,
  openFromFile: openFromFile
};
