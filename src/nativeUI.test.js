import nativeUI from "./nativeUI";

import electron from "electron";

describe("Native UI", () => {
  describe("promptUserToSaveContentToFile", () => {
    it("sends an ipcRenderer message", () => {
      nativeUI.promptUserToSaveContentToFile("foo");
      expect(electron.ipcRenderer.send).toBeCalledWith(
        "saveValueToFile",
        "foo"
      );
    });
  });

  describe("getFileNameFromUser", () => {
    it("opens a saveDialog and returns a fileNamne", () => {
      nativeUI.getFileNameFromUser();

      expect(electron.dialog.showSaveDialog).toBeCalled();
    });
  });

  describe("displayErrorMesage", () => {
    it("opens an error message dialog box", () => {
      const errorTitle = "Error Title";
      const errorMessage = "Error Message";

      nativeUI.displayErrorMessage(errorTitle, errorMessage);

      expect(electron.dialog.showErrorBox).toBeCalledWith(
        errorTitle,
        errorMessage
      );
    });
  });

  describe("displayInfoMesage", () => {
    it("opens an info message dialog box", () => {
      const messageTitle = "Message Title";
      const message = "Message";

      nativeUI.displayInfoMessage(messageTitle, message);

      expect(electron.dialog.showMessageBox).toBeCalledWith({
        type: "info",
        title: messageTitle,
        message: message
      });
    });
  });
});
