const { ipcRenderer, dialog } = require("electron");
const util = require("util");
const fs = require("fs");

const promptUserToSaveContentToFile = contents => {
  ipcRenderer.send("saveValueToFile", contents);
};

const promptUserToOpenFileContents = () => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send("openContentsFromFile");
    ipcRenderer.on("fileContents", (event, fileContents) => {
      resolve(fileContents);
    });
  });
};

const getFileNameToSaveFromUser = () => {
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

const getFileNameToOpenFromUser = () => {
  return new Promise((resolve, reject) => {
    let fileNames = dialog.showOpenDialog({
      filters: [
        {
          name: "Text",
          extensions: ["txt"]
        }
      ]
    });

    if (fileNames[0] === undefined) {
      reject(new Error());
    } else {
      resolve(fileNames[0]);
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

const readFromFile = file => {
  const readFile = util.promisify(fs.readFile);
  const result = readFile(file);
  return result;
};

module.exports = {
  promptUserToSaveContentToFile: promptUserToSaveContentToFile,
  promptUserToOpenFileContents: promptUserToOpenFileContents,
  getFileNameToSaveFromUser: getFileNameToSaveFromUser,
  getFileNameToOpenFromUser: getFileNameToOpenFromUser,
  displayErrorMessage: displayErrorMessage,
  displayInfoMessage: displayInfoMessage,
  writeToFile: writeToFile,
  readFromFile: readFromFile
};
