const ipcRenderer = {
  send: jest.fn(),
  on: jest.fn()
};

const dialog = {
  showSaveDialog: jest.fn(),
  showErrorBox: jest.fn(),
  showMessageBox: jest.fn()
};

module.exports = {
  ipcRenderer: ipcRenderer,
  dialog: dialog
};
