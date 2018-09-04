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
      nativeUI.promptUserToOpenFileContents();
      expect(electron.ipcRenderer.send).toBeCalledWith("openContentsFromFile");
    });

    it("returns a promise", () => {
      const result = nativeUI.promptUserToOpenFileContents();
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe("getFileNameToSaveFromUser", () => {
    it("returns a resolved promise with the fileName the user entered", () => {
      const fileName = "test.txt";
      electron.dialog.showSaveDialog = jest.fn(() => {
        return fileName;
      });

      return expect(nativeUI.getFileNameToSaveFromUser()).resolves.toEqual(
        fileName
      );
    });

    it("returns a rejected promise when the user doesn't enter a fileName", () => {
      electron.dialog.showSaveDialog = jest.fn(() => {
        return undefined;
      });

      return expect(
        nativeUI.getFileNameToSaveFromUser()
      ).rejects.toBeInstanceOf(Error);
    });
  });

  describe("getFileNameToOpenFromUser", () => {
    it("returns a resolved promise with the fileName the user selected", () => {
      const fileName = "test.txt";
      electron.dialog.showOpenDialog = jest.fn(() => {
        return [fileName];
      });

      return expect(nativeUI.getFileNameToOpenFromUser()).resolves.toEqual(
        fileName
      );
    });

    it("returns a rejected promise when the user doesn't select a fileName", () => {
      electron.dialog.showOpenDialog = jest.fn(() => {
        return [undefined];
      });

      return expect(
        nativeUI.getFileNameToOpenFromUser()
      ).rejects.toBeInstanceOf(Error);
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

  describe("readFromFile", () => {
    it("makes a call to fs.readFile", () => {
      const file = "test.txt";

      nativeUI.readFromFile(file);

      expect(fs.readFile).toBeCalledWith(file, expect.any(Function));
    });
  });
});
