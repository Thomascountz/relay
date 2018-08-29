const { ipcRenderer, dialog } = require("electron");

const promptUserToSaveContentToFile = contents => {
  ipcRenderer.send("saveValueToFile", contents);
};

const promptUserToOpenFileContents = () => {
  return new Promise(resolve => {
    ipcRenderer.send("async");
    ipcRenderer.on("reply", (event, result) => {
      resolve(result);
    });
  });
};

const getFileNameFromUser = () => {
  return dialog.showSaveDialog({
    filters: [
      {
        name: "Text",
        extensions: ["txt"]
      }
    ]
  });
};

const displayErrorMessage = (errorTitle, errorMessage) => {
  dialog.showErrorBox(errorTitle, errorMessage);
};

const displayInfoMessage = (messageTitle, message) => {
  dialog.showMessageBox({
    type: "info",
    title: messageTitle,
    message: message
  });
};

module.exports = {
  promptUserToSaveContentToFile: promptUserToSaveContentToFile,
  promptUserToOpenFileContents: promptUserToOpenFileContents,
  getFileNameFromUser: getFileNameFromUser,
  displayErrorMessage: displayErrorMessage,
  displayInfoMessage: displayInfoMessage
};
