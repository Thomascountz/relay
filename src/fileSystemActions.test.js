import { saveToFile } from "./fileSystemActions";

import fs from "fs";
jest.mock("fs");

import nativeUI from "./nativeUI";
jest.mock("./nativeUI");

describe("saveToFile", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("saves content to a file", () => {
    const fileName = "foo.txt";
    const content = "foobar";

    nativeUI.getFileNameFromUser = jest.fn(() => {
      return fileName;
    });

    return saveToFile(content).then(() => {
      expect(nativeUI.getFileNameFromUser).toBeCalled();
      expect(nativeUI.displayInfoMessage).toBeCalled();
      expect(fs.writeFile).toBeCalled();
    });
  });

  it("does nothing if fileName is undefined", () => {
    const fileName = undefined;
    const content = "foobar";

    nativeUI.getFileNameFromUser = jest.fn(() => {
      return fileName;
    });

    return saveToFile(content).catch(err => {
      expect(nativeUI.getFileNameFromUser).toBeCalled();
      expect(nativeUI.displayInfoMessage).not.toBeCalled();
      expect(fs.writeFile).not.toBeCalled();
    });
  });

  it("displays an error message if fs encounters an error", () => {
    const fileName = "test.txt";
    const content = "foobar";

    nativeUI.getFileNameFromUser = jest.fn(() => {
      return fileName;
    });

    fs.writeFile = jest.fn(() => {
      return new Error("TEST TEST TEST");
    });

    return saveToFile(content).catch(err => {
      expect(nativeUI.displayErrorMessage).toBeCalled();
    });
  });
});
