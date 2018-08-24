import { ipcRenderer } from "electron";

exports.promptUserToSaveContentToFile = function(contents) {
  ipcRenderer.send("saveValueToFile", contents);
};
