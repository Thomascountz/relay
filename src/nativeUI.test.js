import nativeUI from "./nativeUI";
import electron from "electron";
import fs from "fs";
jest.mock("fs");

describe("Native UI", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("promptUserToSaveContentToFile", () => {
    it("sends an ipcRenderer message", () => {
      nativeUI.promptUserToSaveContentToFile("foo");
      expect(electron.ipcRenderer.send).toBeCalledWith(
        "saveValueToFile",
        "foo"
      );
    });
  });

  describe("promptUserToOpenFileContents", () => {
    it("sends an ipcRenderer message", () => {
      nativeUI.promptUserToOpenFileContents = () => {
        return Promise.resolve("foo");
      };

      return nativeUI.promptUserToOpenFileContents().then(data => {
        expect(data).toEqual("foo");
      });
    });
  });

  describe("getFileNameFromUser", () => {
    it("returns a resolved promise with the fileName the user entered", () => {
      const fileName = "test.txt";
      electron.dialog.showSaveDialog = jest.fn(() => {
        return fileName;
      });

      return expect(nativeUI.getFileNameFromUser()).resolves.toEqual(fileName);
    });

    it("returns a rejected promise when the user doesn't enter a fileName", () => {
      electron.dialog.showSaveDialog = jest.fn(() => {
        return undefined;
      });

      return expect(nativeUI.getFileNameFromUser()).rejects.toBeInstanceOf(
        Error
      );
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

  describe("writeToFile", () => {
    it("makes a call to fs.writeFile", () => {
      const file = "test.txt";
      const content = "foobar";

      nativeUI.writeToFile(file, content);

      expect(fs.writeFile).toBeCalledWith(file, content, expect.any(Function));
    });
  });
});
