import { promptUserToSaveContentToFile } from "./nativeUI";
import { ipcRenderer } from "electron";

describe("Native UI", () => {
  it("sends an ipcRenderer message", () => {
    promptUserToSaveContentToFile("foo");
    expect(ipcRenderer.send).toBeCalledWith("saveValueToFile", "foo");
  });
});
