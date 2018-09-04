import { saveToFile, openFromFile } from "./fileSystemActions";

import nativeUI from "./nativeUI";
jest.mock("./nativeUI");

describe("fileSystemActions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("saveToFile", () => {
    it("saves content to a file", async () => {
      expect.assertions(1);
      const fileName = "foo.txt";
      const content = "foobar";

      nativeUI.getFileNameToSaveFromUser = jest.fn(() => {
        return Promise.resolve(fileName);
      });

      nativeUI.writeToFile = jest.fn(() => {
        return Promise.resolve();
      });

      await saveToFile(content);

      expect(nativeUI.displayInfoMessage).toBeCalled();
    });

    it("does not write a file if fileName is rejected", async () => {
      const content = "foobar";

      nativeUI.getFileNameToSaveFromUser = jest.fn(() => {
        return Promise.reject(new Error());
      });

      await saveToFile(content);

      expect(nativeUI.writeToFile).not.toBeCalled();
      expect(nativeUI.displayInfoMessage).not.toBeCalled();
      expect(nativeUI.displayErrorMessage).not.toBeCalled();
    });

    it("displays an error message if writeToFile encounters an error", async () => {
      expect.assertions(1);

      const fileName = "foo.txt";
      const content = "foobar";

      nativeUI.getFileNameToSaveFromUser = jest.fn(() => {
        return Promise.resolve(fileName);
      });

      nativeUI.writeToFile = jest.fn(() => {
        return Promise.reject(new Error());
      });

      await saveToFile(content);

      expect(nativeUI.displayErrorMessage).toBeCalled();
    });
  });

  describe("openFromFile", () => {
    it("returns content from a file", async () => {
      const fileName = "test.txt";
      const content = "foobar";

      nativeUI.getFileNameToOpenFromUser = jest.fn(() => {
        return Promise.resolve(fileName);
      });

      nativeUI.readFromFile = jest.fn(() => {
        return Promise.resolve(content);
      });

      const result = await openFromFile();
      expect(result).toEqual(content);
    });

    it("does not write a file if fileName is rejected", async () => {
      nativeUI.getFileNameToOpenFromUser = jest.fn(() => {
        return Promise.reject(new Error());
      });

      await openFromFile();

      expect(nativeUI.readFromFile).not.toBeCalled();
    });

    it("displays an error message if readFromFile encounters an error", async () => {
      const fileName = "foo.txt";

      nativeUI.getFileNameToOpenFromUser = jest.fn(() => {
        return Promise.resolve(fileName);
      });

      nativeUI.readFromFile = jest.fn(() => {
        return Promise.reject(new Error());
      });

      await openFromFile();

      expect(nativeUI.displayErrorMessage).toBeCalled();
    });
  });
});
