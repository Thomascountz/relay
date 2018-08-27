import { promptUserToSaveContentToFile } from "./nativeUI";

import electron from "electron";

describe("Native UI", () => {
  it("sends an ipcRenderer message", () => {
    promptUserToSaveContentToFile("foo");
    expect(electron.ipcRenderer.send).toBeCalledWith("saveValueToFile", "foo");
  });
});
