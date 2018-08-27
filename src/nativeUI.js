import { ipcRenderer } from "electron";

const promptUserToSaveContentToFile = function(contents) {
  ipcRenderer.send("saveValueToFile", contents);
};

module.exports = {
  promptUserToSaveContentToFile: promptUserToSaveContentToFile
};
