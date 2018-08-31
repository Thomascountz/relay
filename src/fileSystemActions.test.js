import { saveToFile } from "./fileSystemActions";

import nativeUI from "./nativeUI";
jest.mock("./nativeUI");

describe("saveToFile", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("saves content to a file", async () => {
    expect.assertions(1);
    const fileName = "foo.txt";
    const content = "foobar";

    nativeUI.getFileNameFromUser = jest.fn(() => {
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

    nativeUI.getFileNameFromUser = jest.fn(() => {
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

    nativeUI.getFileNameFromUser = jest.fn(() => {
      return Promise.resolve(fileName);
    });

    nativeUI.writeToFile = jest.fn(() => {
      return Promise.reject(new Error());
    });

    await saveToFile(content);

    expect(nativeUI.displayErrorMessage).toBeCalled();
  });
});
