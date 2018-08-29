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
    nativeUI.getFileNameFromUser = () => {
      return fileName;
    };

    saveToFile(content);

    const fsErrorCallback = fs.writeFile.mock.calls[0][2];
    fsErrorCallback(null);

    expect(nativeUI.displayInfoMessage).toBeCalled();
    expect(fs.writeFile).toBeCalled();
  });

  it("does not write a file if fileName is undefined", () => {
    const fileName = undefined;
    const content = "foobar";
    nativeUI.getFileNameFromUser = () => {
      return fileName;
    };

    saveToFile(content);

    expect(fs.writeFile).not.toBeCalled();
  });

  it("displays an error message if fs encounters an error", () => {
    const fileName = "foo.txt";
    const content = "foobar";
    nativeUI.getFileNameFromUser = () => {
      return fileName;
    };

    saveToFile(content);

    const fsErrorCallback = fs.writeFile.mock.calls[0][2];
    fsErrorCallback(new Error());

    expect(nativeUI.displayErrorMessage).toBeCalled();
  });
});
