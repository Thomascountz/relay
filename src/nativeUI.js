const { ipcRenderer, dialog } = require("electron");

const promptUserToSaveContentToFile = contents => {
  ipcRenderer.send("saveValueToFile", contents);
};

const getFileNameFromUser = () => {
  return dialog.showSaveDialog();
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
  getFileNameFromUser: getFileNameFromUser,
  displayErrorMessage: displayErrorMessage,
  displayInfoMessage: displayInfoMessage
};
