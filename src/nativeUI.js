const { ipcRenderer, dialog } = require("electron");
const util = require("util");
const fs = require("fs");

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
  return new Promise((resolve, reject) => {
    let fileName = dialog.showSaveDialog({
      filters: [
        {
          name: "Text",
          extensions: ["txt"]
        }
      ]
    });

    if (fileName === undefined) {
      reject(new Error());
    } else {
      resolve(fileName);
    }
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

const writeToFile = (file, content) => {
  const writeFile = util.promisify(fs.writeFile);
  return writeFile(file, content);
};

module.exports = {
  promptUserToSaveContentToFile: promptUserToSaveContentToFile,
  promptUserToOpenFileContents: promptUserToOpenFileContents,
  getFileNameFromUser: getFileNameFromUser,
  displayErrorMessage: displayErrorMessage,
  displayInfoMessage: displayInfoMessage,
  writeToFile: writeToFile
};
